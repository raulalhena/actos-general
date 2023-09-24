import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateCapacityDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    description: string;
}
