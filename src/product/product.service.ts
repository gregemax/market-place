import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UsersService } from 'src/users/users.service';
import { StoreService } from 'src/store/store.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    private userser: UsersService,
    private storeser: StoreService,
  ) {}

  async create(productData: CreateProductDto, req): Promise<Product> {
    try {
      const store = await this.storeser.findById(productData.storeId);

      const product = await this.productModel.create(productData);
      const addproductTostore = await this.storeser.addproductTostore(
        productData.storeId.toString(),
        (await product)._id.toString(),
      );
      return product;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().populate('storeId').exec();
  }

  async findById(id: string): Promise<Product | null> {
    return this.productModel.findById(id).populate('storeId').exec();
  }

  async update(
    id: string,
    updateData: Partial<Product>,
  ): Promise<Product | null> {
    return this.productModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Product | null> {
    return this.productModel.findByIdAndDelete(id).exec();
  }
  async findByStore(storeId: string): Promise<Product[]> {
    return this.productModel.find({ storeId }).exec();
  }
}
