import { PartialType } from '@nestjs/swagger';
import { CreateTimeZoneDto } from './create-timezone.dto';


export class UpdateTimezoneDto extends PartialType(CreateTimeZoneDto) {}
