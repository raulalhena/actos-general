import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateEventDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsDate()
    date: Date;

    tags: string[];
    category: string;
    adress: string;
    startTime: string;
    endTime: string;
    timeZone: string;
    showDate: boolean;
    showTime: boolean;
    type: string;
    mode: string;
    image: string;
    video: string;
    capacity: number;
    price: number;
    payment: string;
    organizedBy: string[];
    contactEmail: string;
    language: string[];
    web: string;
    visibility: boolean;
    status: boolean;
    customForm: string;
    form: Object
}
