import { Injectable } from '@nestjs/common';
import { CreateTimeDto } from './dto/create-time.dto';
import { UpdateTimeDto } from './dto/update-time.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Time } from './schema/time.schema';

@Injectable()
export class TimesService {
  constructor(@InjectModel(Time.name) private timeModel: Model<Time>) {
  }

  createTime(createTimeDto: CreateTimeDto) {
    return this.timeModel.create(createTimeDto);
  }

  bulkCreateTimes(createTimeDto: CreateTimeDto[]) {
    return this.timeModel.create(createTimeDto);
  }

  findAllTimes() {
    return this.timeModel.find();
  }
}
