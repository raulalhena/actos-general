import { Injectable } from '@nestjs/common';
import { CreateVisibilityDto } from './dto/create-visibility.dto';
import { UpdateVisibilityDto } from './dto/update-visibility.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Visibility } from './schema/visibility.schema';

@Injectable()
export class VisibilitiesService {
  constructor(@InjectModel(Visibility.name) private visibilityModel: Model<Visibility>) {
  }

  createVisibility(createVisibilityDto: CreateVisibilityDto) {
    return this.visibilityModel.create(createVisibilityDto);
  }

  bulkCreateVisibilities(createVisibilityDto: CreateVisibilityDto[]) {
    return this.visibilityModel.create(createVisibilityDto);
  }

  findAllVisibilities() {
    return this.visibilityModel.find();
  }
}
