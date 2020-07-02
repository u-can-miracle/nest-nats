import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { AppController } from './app.controller';
import { NATS_SERVICE } from './constants';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: NATS_SERVICE,
        transport: Transport.NATS,
        options: {
          url: 'nats://localhost:4222',
          // queue: 'work_job',
          // @ts-ignore-next-line
          // verbose: true,
        },
      },
    ]),
  ],
  controllers: [AppController],
})

export class AppModule {}
