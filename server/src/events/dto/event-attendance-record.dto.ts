import { IsNotEmpty} from 'class-validator';
import { ObjectId } from 'mongoose';

export class AttendanceRecordDto {
    @IsNotEmpty()
    eventId: ObjectId;

    @IsNotEmpty()
    userId: ObjectId;
}
