import { IsNotEmpty, IsString } from 'class-validator';

export class CreateActiveDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    description: string;
}