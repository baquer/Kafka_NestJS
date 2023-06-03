import { Injectable, OnApplicationShutdown } from "@nestjs/common";
import { Consumer, ConsumerConfig, ConsumerRunConfig, ConsumerSubscribeTopics, Kafka } from "kafkajs";

@Injectable()
export class ConsumerService implements OnApplicationShutdown {

    private readonly kafka = new Kafka({
        // Broker bana lo
        brokers:['localhost:9092'],
    });
    // In Producer we only need 1 to producer the message
    // But in case of Consumer we need more than 1 so we need
    // an array
    private readonly consumers: Consumer[] = [];
    // consume function banao jo
    // topic le ga aur congig le ga
    async consume(topic:ConsumerSubscribeTopics, config: ConsumerRunConfig) {
        const consumer = this.kafka.consumer({groupId: 'nest-js-kafka'});
        // connect subscribe, run
        await consumer.connect();
        await consumer.subscribe(topic);
        await consumer.run(config);
        this.consumers.push(consumer);
    }
    async onApplicationShutdown() {
        // Iterate Karo har cousumer pe aur shut down karp
        for(const consumer of this.consumers) {
            await consumer.disconnect();
        }
    }
}