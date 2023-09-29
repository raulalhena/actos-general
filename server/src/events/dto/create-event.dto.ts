import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateEventDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    date: string;

    tags: string[];
    category: string;
    subcategory: string;
    address: string;
    startTime: string;
    endTime: string;
    timeZone: string;
    showDate: boolean;
    showTime: boolean;
    type: string;
    mode: string;
    image: Blob;
    video: string;
    capacity: number;
    price: number;
    payment: string;
    organizedBy: string[];
    contactEmail: string;
    language: string[];
    web: string;
    visibility: boolean;
    active: boolean;
    customForm: string;
    form: Object
    isPrivate: boolean;
    isLimited: boolean;
    webLink: string;
    confirmed: boolean;
    qrEvent: string;
    qrAttendees: string[];
    attendees: ObjectId[];
    submitted: ObjectId[];
    status: boolean;
}
