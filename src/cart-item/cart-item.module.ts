import { Module } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CartItemController } from './cart-item.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from 'src/product/entities/product.entity';
import { CartItem, CartItemSchema } from './entities/cart-item.entity';

@Module({
  imports:[ MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema },{ name: CartItem.name, schema: CartItemSchema }],),],
  controllers: [CartItemController],
  providers: [CartItemService],
  exports:[CartItemService]
})
export class CartItemModule {}
