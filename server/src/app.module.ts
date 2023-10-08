import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CategoriesModule } from './categories/categories.module';
import { TypesModule } from './types/types.module';
import { LanguagesModule } from './languages/languages.module';
import { ModesModule } from './modes/modes.module';
import { TimesModule } from './times/times.module';
import { TimezonesModule } from './timezones/timezones.module';
import { CapacitiesModule } from './capacities/capacities.module';
import { ActivesModule } from './actives/actives.module';
import { VisibilitiesModule } from './visibilities/visibilities.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({ 
      rootPath: join(__dirname, '..', '/dist/public'),
      exclude: [ '/api/*' ]
   }),
    ConfigModule.forRoot({isGlobal: true}),
    EventsModule,
    UsersModule,
    MongooseModule.forRoot(process.env.MONGODB_URI),
    AuthModule,
    CategoriesModule,
    TypesModule,
    LanguagesModule,
    ModesModule,
    TimesModule,
    TimezonesModule,
    CapacitiesModule,
    ActivesModule,
    VisibilitiesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
