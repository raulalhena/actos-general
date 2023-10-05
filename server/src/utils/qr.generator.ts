import mongoose, { Types } from 'mongoose';
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

const generateUserQR = async (eventId: mongoose.Schema.Types.ObjectId, userId: mongoose.Schema.Types.ObjectId) => {
    try{
        const qr_svg = qr.image(eventId.toString(), { type: 'svg' });
        qr_svg.pipe(createWriteStream(`qr_events/${eventId.toString()}.svg`));   
        const eventQR = qr.imageSync(`http://localhost:8000/api/events/attendance/${eventId.toString()}/${userId.toString()}`, { type: 'svg' });
        return eventQR;
    } catch(error){ 
        throw error;
    }
}

export {
    generateEventQR,
    generateUserQR
}