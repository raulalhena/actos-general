import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    EventsModule,
    UsersModule,
    MongooseModule.forRoot('mongodb://localhost:27017/actos'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
