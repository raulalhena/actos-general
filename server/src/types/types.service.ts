
import { Model } from 'mongoose';
import { Type } from '../types/schemas/type.schema';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';

@Injectable()
export class TypesService {
  constructor(@InjectModel(Type.name) private typeModel: Model<Type>) {}
  createType( createTypeDto: CreateTypeDto) {
    return this.typeModel.create(createTypeDto);
  }

  bulkCreateType( createTypeDto: CreateTypeDto[]) {
    return this.typeModel.create(createTypeDto);
  }

  findAllTypes() {
    return this.typeModel.find();
  }

  async deleteType(id: string): Promise<void> {
    const result = await this.typeModel.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Type with ID ${id} not found`);
    }
  }

}
