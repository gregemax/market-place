import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order, OrderSchema } from './entities/order.entity';
import {
  OrderItem,
  OrderItemSchema,
} from 'src/order-items/entities/order-item.entity';
import {
  CartItem,
  CartItemSchema,
} from 'src/cart-item/entities/cart-item.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { CartModule } from 'src/cart/cart.module';
import { Product, ProductSchema } from 'src/product/entities/product.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CartItem.name, schema: CartItemSchema },
      { name: OrderItem.name, schema: OrderItemSchema },
      { name: Order.name, schema: OrderSchema },
      { name: Product.name, schema: ProductSchema },
    ]),
    CartModule
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
