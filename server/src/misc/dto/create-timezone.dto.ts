import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateTimeZoneDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    description: string;
}
