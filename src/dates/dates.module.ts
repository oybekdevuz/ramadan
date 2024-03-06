import { Module } from '@nestjs/common';
import { DatesService } from './dates.service';
import { DatesController } from './dates.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Date, DateSchema } from './schema/date.schema';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Date.name, schema: DateSchema},
    ]),
    ThrottlerModule.forRoot([{
      ttl: 10,
      limit: 2,
    }]),
  ],
  controllers: [DatesController],
  providers: [DatesService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }],
})
export class DatesModule {}
