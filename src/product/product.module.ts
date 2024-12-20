import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities/product.entity';
import { UsersModule } from 'src/users/users.module';
import { StoreModule } from 'src/store/store.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }],),
    UsersModule,StoreModule
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
