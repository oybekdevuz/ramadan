import { HydratedDocument } from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose"


export type DateDocument = HydratedDocument<Date> 

@Schema({versionKey: false, timestamps: false})
export class Date {

   @Prop({required: true})
    day: number;
    
    @Prop({ required: true, enum: ['dushanba', 'seshanba', 'chorshanba', 'payshanba', 'juma', 'shanba','yakshanba']})
    week: string;
    
    @Prop({required: true})
    melod_date: string;
    
    @Prop({required: true})
    hijr_date: string;
  
    @Prop({required: true})
    sehar: string;
    
    @Prop({required: true})
    iftar: string;
}

export const DateSchema = SchemaFactory.createForClass(Date);