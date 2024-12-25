import { Module } from '@nestjs/common';
import { BoardingService } from './boarding.service';
import { BoardingController } from './boarding.controller';

@Module({
  controllers: [BoardingController],
  providers: [BoardingService],
})
export class BoardingModule {}
