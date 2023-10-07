import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateTypeDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    description: string;
}
