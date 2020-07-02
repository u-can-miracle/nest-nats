import { ServerNats, NatsOptions } from '@nestjs/microservices';

export interface NatsSubscriber {
  key: string;
  value: {
    pattern: string;
    queue: string;
  };
}

export class NatsStrategy extends ServerNats {
  constructor(options: NatsOptions['options']){
    super(options)
    console.log('NatsStrategy')
  }

  bindEvents(client) {
    const obj = Array.from(this.messageHandlers).reduce((obj, [key, value]) => (
      Object.assign(obj, { [key]: value }) // Be careful! Maps can have non-String keys; object literals can't.
    ), {});
    const items = Object.keys(obj);
    const handlers = items.map(item => {
      console.log('item', item)

      return ({
        key: item,
        value: JSON.parse(item),
      })
    }) as NatsSubscriber[];

    console.log('handlers', handlers)

    handlers.forEach(({ key, value }) =>
      client.subscribe(
        value.pattern,
        { queue: value.queue },
        this.getMessageHandler(key, client).bind(this),
      ),
    );
  }
}
