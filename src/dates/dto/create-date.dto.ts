import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateDateDto {
  @IsNotEmpty()
  @IsNumber()
  day: number;
  
  @IsNotEmpty()
  @IsString()
  week: string;
  
  @IsNotEmpty()
  @IsString()
  melod_date: string;
  
  @IsNotEmpty()
  @IsString()
  hijr_date: string;
  
  @IsNotEmpty()
  @IsString()
  sehar: string;
  
  @IsNotEmpty()
  @IsString()
  iftar: string;

}
