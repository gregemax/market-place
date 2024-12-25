import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RegistrationService } from './registreation.service';
import { CreateRegistreationDto } from './dto/create-registreation.dto';
import { UpdateRegistreationDto } from './dto/update-registreation.dto';

@Controller('registreation')
export class RegistreationController {
  constructor(private readonly registreationService: RegistrationService) {}

  @Post()
  create(@Body() createRegistreationDto: CreateRegistreationDto) {
    return this.registreationService.create(createRegistreationDto);
  }

  @Get()
  findAll() {
    return this.registreationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.registreationService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRegistreationDto: UpdateRegistreationDto) {
    return this.registreationService.update(id, updateRegistreationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.registreationService.remove(id);
  }
}
