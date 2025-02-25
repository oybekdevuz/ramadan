import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { CreateDateDto } from './dto/create-date.dto';
import { UpdateDateDto } from './dto/update-date.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Date, DateDocument } from './schema/date.schema';
import { Model } from 'mongoose';
import * as path from "path";
import { readFileSync } from 'fs';
import { DateQueryDto } from './dto/date-query.dto';
import { GetAllQueryDto } from './dto/get-all-query.dto';

@Injectable()
export class DatesService {
  constructor(
    @InjectModel(Date.name) private readonly dateSchema: Model<DateDocument>,
  ) { }
  async create() {
    const filePathToRegions = path.join(process.cwd(), "src/utils/regions.json");
    const filePathToBaseDate = path.join(process.cwd(), "src/utils/tashkent-taqvim.json");

    const regionsData = readFileSync(filePathToRegions, "utf-8");
    const BaseDate = readFileSync(filePathToBaseDate, "utf-8");

    const regions = JSON.parse(regionsData);
    const baseDates = JSON.parse(BaseDate);

    for (const date of baseDates) {
      for (const region of regions) {
        const adjustedSehar = this.adjustTime(date.sehar, region.sehar);
        const adjustedIftar = this.adjustTime(date.iftar, region.iftar);

        await this.dateSchema.create({
          day: date.day,
          week: date.week,
          melod_date: date.melod_date,
          region: region.name,
          hijr_date: date.hijr_date,
          sehar: adjustedSehar,
          iftar: adjustedIftar
        });
      }
    }

    return { data: true }
  }

  adjustTime(baseTime: string, offset: number) {
    let [hours, minutes] = baseTime.split(":").map(Number);
    minutes += offset;
    if (minutes >= 60) {
      hours += Math.floor(minutes / 60);
      minutes = minutes % 60;
    } else if (minutes < 0) {
      hours -= Math.ceil(Math.abs(minutes) / 60);
      minutes = 60 + (minutes % 60);
    }
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  }



  async findAll(query: GetAllQueryDto) {
    const dates = await this.dateSchema.find({ region: query.region });
    return { message: 'Ramadan mubarak 🌙🕋', source: 'namozvaqti.uz', dates }
  }

  async findOne(query: DateQueryDto) {  
    const searchParams: any = {
      region: query.region
    };
  
    if (query.melod_date) searchParams.melod_date = query.melod_date;
    if (query.day) searchParams.day = query.day;
  
    const date = await this.dateSchema.findOne(searchParams);
  
    if (!date) throw new NotFoundException('Ramadan date not found');
  
    return { 
      message: 'Ramadan mubarak 🌙🕋', 
      source: 'namozvaqti.uz', 
      date 
    };
  }
  

  // update(id: string, updateDateDto: UpdateDateDto) {
  //   return this.dateSchema.findByIdAndUpdate(id, updateDateDto, { new: true });
  // }

  // async remove(id: string) {
  //   await this.dateSchema.findByIdAndDelete(id);
  //   return 'Success';
  // }

}
