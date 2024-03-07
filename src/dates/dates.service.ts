import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { CreateDateDto } from './dto/create-date.dto';
import { UpdateDateDto } from './dto/update-date.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Date, DateDocument } from './schema/date.schema';
import { Model } from 'mongoose';

@Injectable()
export class DatesService {
  constructor(
    @InjectModel(Date.name) private readonly dateSchema: Model<DateDocument>,
  ) {}
  create(createDateDto: CreateDateDto) {
    return this.dateSchema.create(createDateDto);
  }


  async findAll() {
    const dates = await this.dateSchema.find();
    return {message: 'Ramadan mubarak 🌙🕋 for donate 9860 2701 0911 0345', addition: this.returnTimes(), source: 'namozvaqti.uz', dates}
  }

  async findOne(@Query() query: any) {
    const date = await this.dateSchema.findOne({melod_date: query.melod_date})
    if(!date) throw new NotFoundException('Ramadan date not found') 
    return {message: 'Ramadan mubarak 🌙🕋 for donate 9860 2701 0911 0345',addition: this.returnTimes(), source: 'namozvaqti.uz', date}
  }

  update(id: string, updateDateDto: UpdateDateDto) {
    return this.dateSchema.findByIdAndUpdate(id, updateDateDto, {new: true});
  }

  async remove(id: string) {
    await this.dateSchema.findByIdAndDelete(id);
    return 'Success';
  }

   returnTimes () {
    return `Avval: Angren (-3), Qo'qon (-7), Namangan (-10), Farg'ona (-10), Marg'ilon (-10), Andijon (-12),  Xonobod (-13)\nKeyin: Jizzax (+6), Guliston (+2), Denov (+6), Jomboy (+7), Samarqand (+9),  Shahrisabz (+10), Kattaqo'rg'on (+12), Qarshi (+14), Nurota (+14), Navoiy, (+16), Buxoro (+19), Xiva (+36), Nukus (+39), Mo'ynoq (+41)`;
  }
}
