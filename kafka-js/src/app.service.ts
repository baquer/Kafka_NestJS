import { Injectable } from '@nestjs/common';
import { switchAll } from 'rxjs';
import { ProducerService } from './kafka/producer.service';

@Injectable()
export class AppService {
  constructor(private readonly producerService: ProducerService){}
  async getHello() {
    await this.producerService.produce({
      topic: 'test',
      messages: [
        {
          value: "Hey There"
        }
      ]
    });
    return 'Hello World!';
  }
}
