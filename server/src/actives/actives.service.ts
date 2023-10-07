import { Injectable } from '@nestjs/common';
import { CreateActiveDto } from './dto/create-active.dto';
import { UpdateActiveDto } from './dto/update-active.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Active } from './schema/active.schema';

@Injectable()
export class ActivesService {
  constructor(@InjectModel(Active.name) private activeModel: Model<Active>) {
  }

  createActive(createActiveDto: CreateActiveDto) {
    return this.activeModel.create(createActiveDto);
  }

  bulkCreateActives(createActiveDto: CreateActiveDto[]) {
    return this.activeModel.create(createActiveDto);
  }

  findAllActives() {
    return this.activeModel.find();
  }

}
