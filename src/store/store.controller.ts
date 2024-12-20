import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards,Request, Query } from '@nestjs/common';
import { StoreService } from './store.service';
import { store } from "./entities/store.entity";
import { Guard } from 'src/auth/guards/jwt-Guard';
import { CreateStoreDto } from './dto/create-store.dto';

@Controller('stores')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post()
  @UseGuards(Guard)
  create(@Body() storeData: CreateStoreDto,@Request()res) {
    const{user}=res
    console.log(user)
    return this.storeService.create(storeData,user.payload.payload._id);
  }

  @Get()
  findAll() {
    return this.storeService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.storeService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateData: Partial<store>) {
    return this.storeService.update(id, updateData);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.storeService.delete(id);
  }
  @Get("findownerId")
  findByOwner(@Query('ownerId') ownerId: string) {
    return this.storeService.findByOwner(ownerId);
  }
}
