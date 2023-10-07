import { Injectable } from '@nestjs/common';
import { CreateModeDto } from './dto/create-mode.dto';
import { UpdateModeDto } from './dto/update-mode.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Mode } from './schema/mode.schema';

@Injectable()
export class ModesService {
  constructor(@InjectModel(Mode.name) private modeModel: Model<Mode>) {
  }

  createMode(createModeDto: CreateModeDto) {
    return this.modeModel.create(createModeDto);
  }

  bulkCreateModes(createModeDto: CreateModeDto[]) {
    return this.modeModel.create(createModeDto);
  }

  findAllModes() {
    return this.modeModel.find();
  }
}
