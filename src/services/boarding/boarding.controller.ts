import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BoardingService } from './boarding.service';
import { CreateBoardingDto } from './dto/create-boarding.dto';
import { UpdateBoardingDto } from './dto/update-boarding.dto';

@Controller('boarding')
export class BoardingController {
  constructor(private readonly boardingService: BoardingService) {}

  @Post()
  create(@Body() createBoardingDto: CreateBoardingDto) {
    return this.boardingService.create(createBoardingDto);
  }

  @Get()
  findAll() {
    return this.boardingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boardingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBoardingDto: UpdateBoardingDto) {
    return this.boardingService.update(+id, updateBoardingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boardingService.remove(+id);
  }
}
