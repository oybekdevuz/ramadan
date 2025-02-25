import { IsOptional, IsNumber, IsString, IsEnum, IsNotEmpty, IsNumberString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { REGIONS, WEEKS } from "../../lib/constants";
import { weeks } from "@nestjs/throttler";

export class DateQueryDto {
  @ApiPropertyOptional({ description: 'Ramazon kunining tartib raqami', example: 10 })
  @IsOptional()
  @IsNumberString()
  day: number;

  @ApiProperty({ description: 'Hudud nomi (viloyat)', example: 'Toshkent', enum: REGIONS })
  @IsNotEmpty()
  @IsEnum(REGIONS)
  region!: string;

  @ApiPropertyOptional({ description: 'Milodiy sana', example: '10/03/2025' })
  @IsOptional()
  @IsString()
  melod_date: string;
}

