import { Module } from '@nestjs/common';
import { RegistreationService } from './registreation.service';
import { RegistreationController } from './registreation.controller';

@Module({
  imports:[],
  controllers: [RegistreationController],
  providers: [RegistreationService],
})
export class RegistreationModule {}
