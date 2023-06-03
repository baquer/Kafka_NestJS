import { Injectable, OnApplicationBootstrap, OnApplicationShutdown, OnModuleInit } from "@nestjs/common";
import { Kafka, Producer, ProducerRecord } from "kafkajs";

@Injectable()
export class ProducerService implements OnModuleInit, OnApplicationShutdown {
    private readonly kafka = new Kafka({
        // Broker bana lo
        brokers:['localhost:9092'],
    });
    private readonly producer: Producer = this.kafka.producer();
    // Ab Usko Connect Karo lo
    async onModuleInit() {
        await this.producer.connect();
    }
    // Ye wala function record banaye gajo hame 
    // produce karna hai
    async produce(record: ProducerRecord) {
        await this.producer.send(record);
    }
    // disconnect karo producer ko agr app shut ho jaye
    async onApplicationShutdown() {
        await this.producer.disconnect();
    }
}