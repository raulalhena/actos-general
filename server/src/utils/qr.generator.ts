import mongoose, { Types } from 'mongoose';
import * as qr from 'qr-image';
import { createWriteStream } from 'fs';

const generateEventQR = async (eventId: Types.ObjectId) => {
    try{
        const qr_svg = qr.image(`${eventId}_qr`, { type: 'svg' });
        qr_svg.pipe(createWriteStream(`qr_events/${eventId}.svg`));   
        const eventQR = qr.imageSync(eventId.toString(), { type: 'svg' });

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