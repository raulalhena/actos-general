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
    startTime: Date;
    endTime: Date;
    timeZone: string;
    showStartTime: boolean;
    showEndTime: boolean;
    confirmed: boolean;
    type: string;
    mode: string;
    image: string;
    video: string;
    capacity: number;
    price: number;
    payment: string;
    contact: string;
    language: [ string ];
    web: string;
    visibility: boolean;
    status: boolean;
    customForm: string;
    form: Object
}
