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
  BadRequestException,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { addtocart, CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Guard } from 'src/auth/guards/jwt-Guard';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @UseGuards(Guard)
  async create(@Body() createCartDto: addtocart, @Request() req) {
    return await this.cartService.addProductToCart(
      req.user.payload.payload._id.toString(),
      createCartDto,
    );
  }

  
  @Get()
  async findAll() {
    try {
      // Adding pagination for better scalability
      return await this.cartService.findAll({ limit: 10, offset: 0 });
    } catch (error) {
      throw new BadRequestException('Error retrieving carts');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.cartService.findOne(id);
    } catch (error) {
      throw new BadRequestException('Cart not found');
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    try {
      return await this.cartService.update(id, updateCartDto);
    } catch (error) {
      throw new BadRequestException('Unable to update cart');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.cartService.remove(id);
      return { message: 'Cart successfully removed' };
    } catch (error) {
      throw new BadRequestException('Unable to remove cart');
    }
  }
}
