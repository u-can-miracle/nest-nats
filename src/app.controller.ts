import { Controller, Inject, Logger } from '@nestjs/common';
import {
  MessagePattern,
  EventPattern,
  Payload,
  Ctx,
  NatsContext,
  ClientProxy,
  Transport,
} from '@nestjs/microservices';

import { NATS_SERVICE } from './constants';

const delay = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

@Controller()
export class AppController {
  constructor(
    @Inject(NATS_SERVICE) private natsClient: ClientProxy,
  ) {}

  // @MessagePattern('hello')
  @EventPattern({ queue: 'work_job', pattern: 'hello' })
  async getHello(@Payload() data: any) {

    await delay(1000 * 3);

    if (data.reply) {
      await this.natsClient.emit(data.reply, data);
    }

    console.log('after delay', data);

    return 'Hi!';
  }

  async onModuleInit() {
    try {
      console.log('onModuleInit start')
      await this.natsClient.connect();
      console.log('Nats connected!');
    } catch (err) {
      console.log('err', err)
    }
  }
}
