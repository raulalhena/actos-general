import { Injectable } from '@nestjs/common';
import { CreateTimezoneDto } from './dto/create-timezone.dto';
import { UpdateTimezoneDto } from './dto/update-timezone.dto';

@Injectable()
export class TimezoneService {
  create(createTimezoneDto: CreateTimezoneDto) {
    return 'This action adds a new timezone';
  }

  findAll() {
    return `This action returns all timezone`;
  }

  findOne(id: number) {
    return `This action returns a #${id} timezone`;
  }

  update(id: number, updateTimezoneDto: UpdateTimezoneDto) {
    return `This action updates a #${id} timezone`;
  }

  remove(id: number) {
    return `This action removes a #${id} timezone`;
  }
}
