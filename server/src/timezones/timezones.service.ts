import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TimeZone } from './schema/timezone.schema';
import { CreateTimeZoneDto } from './dto/create-timezone.dto';

@Injectable()
export class TimezonesService {
  constructor(@InjectModel(TimeZone.name) private timezoneModel: Model<TimeZone>) {
  }

  createTimezone(createTimezoneDto: CreateTimeZoneDto) {
    return this.timezoneModel.create(createTimezoneDto);
  }

  bulkCreateTimezones(createTimezoneDto: CreateTimeZoneDto[]) {
    return this.timezoneModel.create(createTimezoneDto);
  }

  findAllTimezones() {
    return this.timezoneModel.find();
  }
}
