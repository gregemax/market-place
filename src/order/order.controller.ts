import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDTO } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Guard } from 'src/auth/guards/jwt-Guard';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  
  async create(@Body() createOrderDto: CreateOrderDTO) {
    
    // return this.orderService.createOrder(user.payload.payload._id,createOrderDto.shippingAddress);
    return await this.orderService.createOrder(
      createOrderDto.userId,
      createOrderDto.orderItems,
      createOrderDto.shippingAddress,
      createOrderDto.contactInfo,
    );
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}
