import {  IsNotEmpty, IsString } from 'class-validator';

export class CreateModeDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    text: string;

    @IsString()
    value: string;
}
