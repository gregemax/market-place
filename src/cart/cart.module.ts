import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CartItem,
  CartItemSchema,
} from 'src/cart-item/entities/cart-item.entity';
import { Product, ProductSchema } from 'src/product/entities/product.entity';
import { Cart, CartSchema } from './entities/cart.entity';
import { CartItemModule } from 'src/cart-item/cart-item.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: CartItem.name, schema: CartItemSchema },
      { name: Cart.name, schema: CartSchema },
    ]),
    CartItemModule
  ],
  controllers: [CartController],
  providers: [CartService],
  exports:[CartService]
})
export class CartModule {}
