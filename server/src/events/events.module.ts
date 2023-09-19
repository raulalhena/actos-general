import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema } from './schemas/event.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Event.name,
        schema: EventSchema,
      },
    ]),
  ],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
