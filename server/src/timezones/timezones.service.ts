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

  async deleteTimezone(id: string): Promise<void> {
    const result = await this.timezoneModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw aNotFoundException(`Timezone with ID ${id} not found`);
    }
  }
}
function aNotFoundException(arg0: string) {
  throw new Error('Function not implemented.');
}

