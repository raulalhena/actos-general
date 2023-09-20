import { Injectable } from '@nestjs/common';
import { CreateModeDto } from './dto/create-mode.dto';
import { UpdateModeDto } from './dto/update-mode.dto';

@Injectable()
export class ModesService {
  create(createModeDto: CreateModeDto) {
    return 'This action adds a new mode';
  }

  findAll() {
    return `This action returns all modes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mode`;
  }

  update(id: number, updateModeDto: UpdateModeDto) {
    return `This action updates a #${id} mode`;
  }

  remove(id: number) {
    return `This action removes a #${id} mode`;
  }
}
