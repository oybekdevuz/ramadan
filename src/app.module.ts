import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DatesModule } from './dates/dates.module';


@Module({
  imports: [
  ConfigModule.forRoot({envFilePath: '.env', isGlobal: true}),
    MongooseModule.forRoot(process.env.DB_URL),
    DatesModule,

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
