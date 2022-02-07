import { createClient } from "redis";

export class RedisService {
  private client: any;

  async connect(url: string) {
    this.client = createClient({ url });
    await this.client.connect();
  }

  async get(key: string): Promise<Record<string, any>> {
    const val = await this.client.get(key);
    return JSON.parse(val);
  }

  async set(key: string, value: Record<string, any>): Promise<void> {
    const val = JSON.stringify(value);
    await this.client.set(key, val);
    return;
  }

  async publish(channel: string, message: string): Promise<void> {
    this.client.publish(channel, message);
  }

  async subscribe(channel: string): Promise<string> {
    const subscriber = this.client.duplicate();
    await subscriber.connect();
    return new Promise((resolve) =>
      subscriber.subscribe(channel, (message: string) => {
            resolve(message);
            subscriber.quit();
        })
    );
  }
}
