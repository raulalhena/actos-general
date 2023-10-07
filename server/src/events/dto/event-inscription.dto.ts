import { ObjectId } from 'mongoose'

export class EventInscriptionDto {
    userId: ObjectId;
    eventId: ObjectId;
}