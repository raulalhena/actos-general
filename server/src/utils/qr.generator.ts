import mongoose, { Types, ObjectId } from 'mongoose';
import * as qr from 'qr-image';
import { createWriteStream } from 'fs';


const generateEventQR = async (eventId: Types.ObjectId) => {
    try{
        const qr_svg = qr.image(eventId.toString(), { type: 'png' });
        
        qr_svg.pipe(createWriteStream(`src/public/${eventId.toString()}.png`));   
        const eventQR = qr.imageSync(`https://actos.up.railway.app/api/events/${eventId.toString()}`, { type: 'png' });
        return eventQR;
    } catch(error){ 
        throw error;
    }
}

const generateUserQR = async (eventId: ObjectId, userId: ObjectId) => {
    try{
        const data = `${eventId.toString()}/${userId.toString()}`;
        const imgName = `${eventId.toString()}_${userId.toString()}`;

        const qr_svg = qr.image(data, { type: 'png' });
        const eventQR = qr.imageSync(data, { type: 'png' });
        
        return eventQR;
    } catch(error){ 
        throw error;
    }
}

export {
    generateEventQR,
    generateUserQR
}