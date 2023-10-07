import mongoose, { Types, ObjectId } from 'mongoose';
import * as qr from 'qr-image';
import { createWriteStream } from 'fs';

const generateEventQR = async (eventId: Types.ObjectId) => {
    try{
        const qr_svg = qr.image(eventId.toString(), { type: 'png' });
        
        qr_svg.pipe(createWriteStream(`src/public/${eventId.toString()}.png`));   
        const eventQR = qr.imageSync(`http://localhost:8000/api/events/${eventId.toString()}`, { type: 'png' });
        return eventQR;
    } catch(error){ 
        throw error;
    }
}

const generateUserQR = async (eventId: ObjectId, userId: ObjectId) => {
    try{
        const qr_svg = qr.image(eventId.toString(), { type: 'png' });
        const eventQR = qr.imageSync(`http://localhost:8000/api/events/attendance/${eventId.toString()}/${userId.toString()}`, { type: 'png' });
        return eventQR;
    } catch(error){ 
        throw error;
    }
}

export {
    generateEventQR,
    generateUserQR
}