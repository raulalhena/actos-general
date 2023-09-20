import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    EventsModule,
    UsersModule,
    MongooseModule.forRoot(process.env.MONGODB_URI),
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
