import { Injectable } from '@nestjs/common';
import { CreateMiscDto } from './dto/create-misc.dto';
import { UpdateMiscDto } from './dto/update-misc.dto';

@Injectable()
export class MiscService {
  create(createMiscDto: CreateMiscDto) {
    return 'This action adds a new misc';
  }

  findAll() {
    return `This action returns all misc`;
  }

  findOne(id: number) {
    return `This action returns a #${id} misc`;
  }

  update(id: number, updateMiscDto: UpdateMiscDto) {
    return `This action updates a #${id} misc`;
  }

  remove(id: number) {
    return `This action removes a #${id} misc`;
  }
}
