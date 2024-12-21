import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  OrderItem,
  OrderItemDocument,
} from 'src/order-items/entities/order-item.entity';
import { Order, OrderDocument } from './entities/order.entity';
import { CartService } from 'src/cart/cart.service';
import {
  CartItem,
  CartItemDocument,
} from 'src/cart-item/entities/cart-item.entity';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    private readonly cartService: CartService,
    @InjectModel(OrderItem.name)
    private orderItemModel: Model<OrderItemDocument>,
    @InjectModel(CartItem.name) private cartItemModel: Model<CartItemDocument>,
  ) {}

  async createOrder(userId: string, shippingAddress: string): Promise<Order> {
    try {
      // Fetch the user's cart
      const cart = await this.cartService.findCartByUserId(userId);

      if (!cart || cart.items.length === 0) {
        throw new Error('Cart is empty');
      }

      const orderItems = await Promise.all(
        cart.items.map(async (cartItemId) => {
          const cartItem = await this.cartItemModel.findById(cartItemId);
          const orderItem = new this.orderItemModel({
            product: cartItem.product,
            quantity: cartItem.quantity,
            price: cartItem.price,
          });
          return orderItem.save();
        }),
      );

      const totalAmount = orderItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      );

      // Create an Order
      const order = new this.orderModel({ 
        user: userId,
        store: cart.items[0].store, // Assuming store is stored in CartItem
        items: orderItems.map((item) => item._id),
        totalAmount,
        shippingAddress,
        status: 'pending',
      });

      return await order.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    return await this.orderModel.find();
  }

  async findOne(id: string) {
    const user = await this.orderModel.findById(id);
    if (!user) {
      throw new NotFoundException('no user found');
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateOrderDto) {
    try {
      const user = await this.orderModel.findByIdAndUpdate(id, updateUserDto, {
        new: true,
        runValidators: false,
      });
      if (!user) {
        throw new NotFoundException('no user found');
      }
      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    const user = await this.orderModel.findByIdAndDelete(id);
    if (!user) {
      throw new NotFoundException('no user found to delete');
    }
    return user;
  }
}
