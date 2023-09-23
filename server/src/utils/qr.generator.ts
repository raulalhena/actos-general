import mongoose, { Types } from 'mongoose';
import * as qr from 'qr-image';
import { createWriteStream } from 'fs';

const generateEventQR = async (eventId: Types.ObjectId) => {
    try{
        const qr_svg = qr.image(eventId.toString(), { type: 'svg' });
        qr_svg.pipe(createWriteStream(`qr_events/${eventId.toString()}.svg`));   
        const eventQR = qr.imageSync(`http://localhost:8000/api/events/attendance/${eventId.toString()}`, { type: 'svg' });
        return eventQR;
    } catch(error){ 
        console.log(error);
    }
}

const generateUserQR = async (eventId: mongoose.Schema.Types.ObjectId, userId: mongoose.Schema.Types.ObjectId) => {
    return 'svg';
}

export {
    generateEventQR,
    generateUserQR
}