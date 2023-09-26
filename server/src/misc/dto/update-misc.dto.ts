import { PartialType } from '@nestjs/mapped-types';
import { CreateMiscDto } from './create-misc.dto';

export class UpdateMiscDto extends PartialType(CreateMiscDto) {}
