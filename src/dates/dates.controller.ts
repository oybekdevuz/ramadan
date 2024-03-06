import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { DatesService } from './dates.service';
import { CreateDateDto } from './dto/create-date.dto';
import { UpdateDateDto } from './dto/update-date.dto';
import { ApiExcludeEndpoint, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';

@Controller('ramadan')
export class DatesController {
  constructor(private readonly datesService: DatesService) {}

  @ApiExcludeEndpoint()
  @Post('create/date')
  create(@Body() createDateDto: CreateDateDto) {
    return this.datesService.create(createDateDto);
  }

  @ApiTags("Vaqtlarni olish")
  @ApiOperation({summary: "bir oylik vaqt"})
  @Get()
  findAll() {
    return this.datesService.findAll();
  }
  
  @ApiTags("Vaqtlarni olish")
  @ApiOperation({summary: "bir kunlik vaqt"})
  @ApiQuery({ name: 'melod_date', required: true, description: 'Sanaga tegishli vaqtni olish' })
  @Get('one')
  findOne(@Query() query: any) {
    return this.datesService.findOne(query);
  }
  
  @ApiExcludeEndpoint()
  @Put('update/date/:id')
  update(@Param('id') id: string, @Body() updateDateDto: UpdateDateDto) {
    return this.datesService.update(id, updateDateDto);
  }
  
  @ApiExcludeEndpoint()
  @Delete('delete/date/:id')
  remove(@Param('id') id: string) {
    return this.datesService.remove(id);
  }
}
