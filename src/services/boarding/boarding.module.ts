import { Module } from '@nestjs/common';
import { BoardingService } from './boarding.service';
import { BoardingController } from './boarding.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Boarding, BoardingSchema } from './entities/boarding.entity';

@Module({
  imports:[MongooseModule.forFeature([{name:Boarding.name,schema:BoardingSchema}])],
  controllers: [BoardingController],
  providers: [BoardingService],
})
export class BoardingModule {}
