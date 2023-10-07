import { PartialType } from '@nestjs/swagger';
import { CreateActiveDto } from './create-active.dto';

export class UpdateActiveDto extends PartialType(CreateActiveDto) {}
