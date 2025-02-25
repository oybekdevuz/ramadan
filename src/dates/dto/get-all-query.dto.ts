import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsNumber, IsString, IsEnum } from "class-validator";
import { REGIONS } from "../../lib/constants";

export class GetAllQueryDto {

  @ApiProperty({ description: 'Hudud nomi (viloyat)', example: 'Toshkent', enum: REGIONS })
  @IsEnum(REGIONS)
  region!: string;

}