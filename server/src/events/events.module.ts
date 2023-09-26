import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema, Event } from './schemas/event.schema';
import { MulterModule } from '@nestjs/platform-express';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';

@Module({
    imports: [
        UsersModule,
        MongooseModule.forFeature([
            {
                name: Event.name,
                schema: EventSchema,
            },
        ]),
        MulterModule.register({
            dest: './upload',
        })
    ],
    controllers: [ EventsController ],
    providers: [ EventsService ],
})
export class EventsModule {}
