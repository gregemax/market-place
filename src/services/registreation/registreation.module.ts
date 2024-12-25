import { Module } from '@nestjs/common';
import { RegistrationService } from './registreation.service';
import { RegistreationController } from './registreation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Registreation,
  RegistreationSchema,
} from './entities/registreation.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Registreation.name, schema: RegistreationSchema },
    ]),
  ],
  controllers: [RegistreationController],
  providers: [RegistrationService],
})
export class RegistreationModule {}
