import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesModule } from './categories/categories.module';
import { TypesModule } from './types/types.module';
import { ModesModule } from './modes/modes.module';
import { MiscModule } from './misc/misc.module';

@Module({
  imports: [
    EventsModule,
    UsersModule,
    MongooseModule.forRoot('mongodb://localhost:27017/actos'),
    CategoriesModule,
    TypesModule,
    ModesModule,
    MiscModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
