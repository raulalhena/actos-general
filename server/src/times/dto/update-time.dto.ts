import { PartialType } from '@nestjs/swagger';
import { CreateTimeDto } from './create-time.dto';

export class UpdateTimeDto extends PartialType(CreateTimeDto) {}
