import { Injectable } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { CartItemService } from 'src/cart-item/cart-item.service';
import { InjectModel } from '@nestjs/mongoose';
import { OrderItem, OrderItemDocument } from './entities/order-item.entity';
import { Model } from 'mongoose';

@Injectable()
export class OrderItemsService {
  //constructor(private cartitem:CartItemService, @InjectModel(OrderItem.name) private orderItemModel: Model<OrderItemDocument>,){}
 async create(cart) {
  
      // return await Promise.all(
      //   cart.items.map(async (cartItemId) => {
      //     const cartItem = await this.cartitem.findOne(cartItemId);
      //     const orderItem = await this.orderItemModel.create({
      //       product: cartItem.product,
      //       quantity: cartItem.quantity,
      //       price: cartItem.price,
      //     });
      //     return await orderItem
      //   }),
      // );
  }

  findAll() {
    return ;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderItem`;
  }

  update(id: number, updateOrderItemDto: UpdateOrderItemDto) {
    return `This action updates a #${id} orderItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderItem`;
  }
}
