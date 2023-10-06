import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStatusDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    description: string;
}