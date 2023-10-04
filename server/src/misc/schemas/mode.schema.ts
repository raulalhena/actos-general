import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import  { HydratedDocument } from 'mongoose';

export type ModeDocument = HydratedDocument<Mode>;

@Schema({ timestamps: true })
export class Mode {
    @Prop({ required: [ true, 'El nombre del modo es requerido.' ] })
        name: string;

    @Prop()
        description: string;
}

export const ModeSchema = SchemaFactory.createForClass(Mode);
