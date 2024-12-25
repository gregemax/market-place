import { Module } from '@nestjs/common';
import { VeterinaryService } from './veterinary.service';
import { VeterinaryController } from './veterinary.controller';
import { Veterinary, VeterinarySchema } from './entities/veterinary.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([{ name: Veterinary.name, schema: VeterinarySchema }])],
  controllers: [VeterinaryController],
  providers: [VeterinaryService],
})
export class VeterinaryModule {}
