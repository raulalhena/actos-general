import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MiscModule } from './misc/misc.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
  //   ServeStaticModule.forRoot({ 
  //     rootPath: join(__dirname, '..', '/dist/public'),
  //     exclude: [ '/api/*' ]
  //  }),
    ConfigModule.forRoot({isGlobal: true}),
    EventsModule,
    UsersModule,
    MiscModule,
    MongooseModule.forRoot(process.env.MONGODB_URI),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
