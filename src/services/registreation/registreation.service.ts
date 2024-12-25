import { Injectable } from '@nestjs/common';
import { CreateRegistreationDto } from './dto/create-registreation.dto';
import { UpdateRegistreationDto } from './dto/update-registreation.dto';

@Injectable()
export class RegistreationService {
  create(createRegistreationDto: CreateRegistreationDto) {
    return 'This action adds a new registreation';
  }

  findAll() {
    return `This action returns all registreation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} registreation`;
  }

  update(id: number, updateRegistreationDto: UpdateRegistreationDto) {
    return `This action updates a #${id} registreation`;
  }

  remove(id: number) {
    return `This action removes a #${id} registreation`;
  }
}
