import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateVisibilityDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    description: string;
}
