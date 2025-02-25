import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { DatesService } from './dates.service';
import { CreateDateDto } from './dto/create-date.dto';
import { UpdateDateDto } from './dto/update-date.dto';
import { ApiExcludeEndpoint, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { DateQueryDto } from './dto/date-query.dto';
import { GetAllQueryDto } from './dto/get-all-query.dto';

@Controller('ramadan')
export class DatesController {
  constructor(private readonly datesService: DatesService) { }

  // @ApiExcludeEndpoint()
  // @Post('create/date')
  // create() {
  //   return this.datesService.create();
  // }

  @ApiTags("Vaqtlarni olish")
  @ApiOperation({ summary: "bir oylik vaqt" })
  @Get()
  findAll(@Query() query: GetAllQueryDto) {
    return this.datesService.findAll(query);
  }

  @ApiTags("Vaqtlarni olish")
  @ApiOperation({ summary: "bir kunlik vaqt" })
  @Get('one')
  findOne(@Query() query: DateQueryDto) {
    return this.datesService.findOne(query);
  }

  // @ApiExcludeEndpoint()
  // @Put('update/date/:id')
  // update(@Param('id') id: string, @Body() updateDateDto: UpdateDateDto) {
  //   return this.datesService.update(id, updateDateDto);
  // }

  // @ApiExcludeEndpoint()
  // @Delete('delete/date/:id')
  // remove(@Param('id') id: string) {
  //   return this.datesService.remove(id);
  // }
}
