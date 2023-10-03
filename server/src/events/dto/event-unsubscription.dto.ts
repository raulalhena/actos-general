import { ObjectId } from 'mongoose'

export class EventUnsubscriptionDto {
    userId: ObjectId | string
    eventId: ObjectId | string
}