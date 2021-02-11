import { Channel, connect } from "amqplib";

import { DirectPublisher } from "@/application/protocols";
import { connectionUrl, defaultExchange } from "@/main/config/rabbitmq";

export class AMQPAdapter implements DirectPublisher {
  private channel: Channel;

  constructor() {
    this.setUpConnection();
  }

  private async setUpConnection(): Promise<void> {
    const connection = await connect(connectionUrl);
    this.channel = await connection.createChannel();
  }

  async publishDirect<T = unknown>(key: string, params: T): Promise<void> {
    await this.channel.assertExchange(defaultExchange, "direct", {
      durable: false,
    });
    this.channel.publish(
      defaultExchange,
      key,
      Buffer.from(JSON.stringify(params))
    );
  }
}
