import { PartialType } from '@nestjs/swagger';
import { CreateVisibilityDto } from './create-visibility.dto';

export class UpdateVisibilityDto extends PartialType(CreateVisibilityDto) {}
