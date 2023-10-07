import { Module } from '@nestjs/common';
import { TimesService } from './times.service';
import { TimesController } from './times.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Time, TimeSchema } from './schema/time.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Time.name,
        schema: TimeSchema
      }
    ])
  ],
  controllers: [TimesController],
  providers: [TimesService]
})
export class TimesModule {}
