import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from 'src/product/entities/product.entity';
import { Model } from 'mongoose';
import { CartItem, CartItemDocument } from './entities/cart-item.entity';

@Injectable()
export class CartItemService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(CartItem.name) private cartItemModel: Model<CartItemDocument>,
  ) {}
  async create(productId: string, quantity: number) {
    const product = await this.productModel.findById(productId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    if (!product.numberOfStemStore||product.numberOfStemStore<0) {
      throw new NotFoundException('Product not found');
    }

    const price = product.price;

    // Create a CartItem
    const cartItem = await this.cartItemModel.create({
      product: productId,
      quantity,
      price,
    });

   return await cartItem
  }

  findAll() {
    return `This action returns all cartItem`;
  }

   async findOne(id: string) {
    return await this.cartItemModel.findById(id) 
  }

  update(id: number, updateCartItemDto: UpdateCartItemDto) {
    return `This action updates a #${id} cartItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} cartItem`;
  }
}
