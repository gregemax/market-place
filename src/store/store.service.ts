import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { store, storeDocument } from './entities/store.entity';
import { CreateStoreDto } from './dto/create-store.dto';
import { UsersService } from 'src/users/users.service';
import { UpdateStoreDto } from './dto/update-store.dto';
import { UserDocument } from 'src/users/entities/user.entity';

@Injectable()
export class StoreService {
  constructor(
    @InjectModel(store.name) private storeModel: Model<storeDocument>,
    private userser: UsersService,
    @InjectModel('users') private usermodule: Model<UserDocument>
  ) {}

  async create(storeData: CreateStoreDto, userid) {
    try {
      storeData['user'] = userid;

      const role = await this.userser.role(userid, 'store_owner');

      console.log(storeData, role);

      const store = await this.storeModel.create(storeData);

      const {_id} = store


      const updateuser = await this.userser.addStoreToUser(userid.toString(), _id.toString());
      return store;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<store[]> {
    return this.storeModel.find().exec();
  }

  async findById(id: string): Promise<store | null> {
    return this.storeModel.findById(id).exec();
  }

  async update(id: string, updateData: UpdateStoreDto): Promise<store | null> {
    return this.storeModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
  }

  async delete(id: string): Promise<store | null> {
    return this.storeModel.findByIdAndDelete(id).exec();
  }

  async findByOwner(userId: string): Promise<store[]> {
    return this.storeModel.find({ user: userId }).exec();
  }
  async addproductTostore(storeId: string, productId: string): Promise<store | null> {
    return this.storeModel
      .findByIdAndUpdate(
        storeId,
        { $push: { products: productId } }, 
        { new: true },
      )
      .populate('products') 
      .exec();
  }

  async upload(user,url){
    const storeid = await this.userser.findOne(
      user.payload.payload._id.toString()
    ); 
    return await this.update(storeid.storeIds.toString(), {
      store_picture: url,
    });
  }
}
