import { PartialType } from '@nestjs/mapped-types';
import { CreateModeDto } from './create-mode.dto';

export class UpdateModeDto extends PartialType(CreateModeDto) {}
