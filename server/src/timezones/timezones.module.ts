import { Module } from '@nestjs/common';
import { TimezonesService } from './timezones.service';
import { TimezonesController } from './timezones.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TimeZone, TimeZoneSchema } from './schema/timezone.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: TimeZone.name,
        schema: TimeZoneSchema
      }
    ])
  ],
  controllers: [TimezonesController],
  providers: [TimezonesService]
})
export class TimezonesModule {}
