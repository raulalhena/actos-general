import { PartialType } from '@nestjs/swagger';
import { CreateCapacityDto } from './create-capacity.dto';

export class UpdateCapacityDto extends PartialType(CreateCapacityDto) {}
