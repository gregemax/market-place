import { Module } from '@nestjs/common';
import { TrainingService } from './training.service';
import { TrainingController } from './training.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { training, trainingSchema } from './entities/training.entity';

@Module({
  imports:[MongooseModule.forFeature([{ name: training.name, schema: trainingSchema }])],
  controllers: [TrainingController],
  providers: [TrainingService],
})
export class TrainingModule {}
