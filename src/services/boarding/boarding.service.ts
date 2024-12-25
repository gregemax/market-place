import { Injectable } from '@nestjs/common';
import { CreateBoardingDto } from './dto/create-boarding.dto';
import { UpdateBoardingDto } from './dto/update-boarding.dto';

@Injectable()
export class BoardingService {
  create(createBoardingDto: CreateBoardingDto) {
    return 'This action adds a new boarding';
  }

  findAll() {
    return `This action returns all boarding`;
  }

  findOne(id: number) {
    return `This action returns a #${id} boarding`;
  }

  update(id: number, updateBoardingDto: UpdateBoardingDto) {
    return `This action updates a #${id} boarding`;
  }

  remove(id: number) {
    return `This action removes a #${id} boarding`;
  }
}
