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
      const store = await this.userser.findOne(
        req.user.payload.payload._id.toString(),
      );
      productData['storeId'] = store.storeIds;
      const product = await this.productModel.create(productData);
      const addproductTostore = await this.storeser.addproductTostore(
        store.storeIds.toString(),
        (await product)._id.toString(),
      );
      return product;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(search?: string): Promise<Product[]> {
    const filter = search?.trim() // Check if search is defined and not empty
      ? { name: { $regex: search, $options: 'i' } } // Case-insensitive search by name
      : {};
  
    return this.productModel
      .find(filter)
      .sort({ createdAt: -1 }) // Sort by creation date in descending order
      .populate('storeId') // Populate the storeId field
      .exec();
  }
  
  async findbycat(category): Promise<Product[]> {
    return this.productModel.find({category}).populate('storeId').exec();
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
