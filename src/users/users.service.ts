import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './entities/user.entity';
import * as bcryptjs from 'bcryptjs';
@Injectable()
export class UsersService {
  constructor(@InjectModel('users') private usermodule: Model<UserDocument>) {}
  async create(createUserDto: CreateUserDto) {
    try {
      createUserDto.password = await bcryptjs.hash(createUserDto.password, 12);
      const new_user = await this.usermodule.create(createUserDto);
      return new_user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    return await this.usermodule.find();
  }

  async findOne(id: string) {
    const user = await this.usermodule.findById(id);
    if (!user) {
      throw new NotFoundException('no user found');
    }
    return user;
  }
  async findemail(email: string) {
    const user = await this.usermodule.findOne({ email });
    if (!user) {
      throw new NotFoundException('no user found');
    }
    return await user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.usermodule.findByIdAndUpdate(id, updateUserDto, {
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
    const user = await this.usermodule.findByIdAndDelete(id);
    if (!user) {
      throw new NotFoundException('no user found to delete');
    }
    return user;
  }
  async role(id, role) {
    const user = await this.usermodule.findById(id);
    if (!user) {
      throw new NotFoundException('no user found');
    }
    user.role = role;
    return await user.save({validateBeforeSave:false})
  }

  async addStoreToUser(userId: string, storeId: string): Promise<User | null> {
    return this.usermodule
      .findByIdAndUpdate(
        userId,
        { $push: { storeIds: storeId } }, // Add storeId to storeIds array
        { new: true },
      )
      .populate('storeIds') // Populate updated storeIds
      .exec();
  }
}
