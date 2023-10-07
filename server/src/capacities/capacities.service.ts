import { Injectable } from '@nestjs/common';
import { CreateCapacityDto } from './dto/create-capacity.dto';
import { UpdateCapacityDto } from './dto/update-capacity.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Capacity } from './schema/capacity.schema';

@Injectable()
export class CapacitiesService {
  constructor(@InjectModel(Capacity.name) private capacityModel: Model<Capacity>) {
  }

  createCapacity(createCapacityDto: CreateCapacityDto) {
    return this.capacityModel.create(createCapacityDto);
  }

  bulkCreateCapacities(createCapacityDto: CreateCapacityDto[]) {
    return this.capacityModel.create(createCapacityDto);
  }

  findAllCapacities() {
    return this.capacityModel.find();
  }
}
