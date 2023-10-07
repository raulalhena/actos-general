import { PartialType } from '@nestjs/swagger';
import { CreateModeDto } from './create-mode.dto';

export class UpdateModeDto extends PartialType(CreateModeDto) {}
