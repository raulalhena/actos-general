import { ObjectId } from 'mongoose'

export class EventInscriptionDto {
    userId: ObjectId | string
    eventId: ObjectId | string
}