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
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UsersService {
  constructor(@InjectModel('users') private usermodule: Model<UserDocument>,private jwtService:JwtService) {}
  async create(createUserDto: CreateUserDto) {
    try {
      createUserDto.password = await bcryptjs.hash(createUserDto.password, 12);
      const new_user = await this.usermodule.create(createUserDto);
      const token = await this.jwtService.sign({payload:new_user});
      return {
        user:new_user,
        token
      };
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
   // console.log(user)
    return await user;
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
    return await user.save({ validateBeforeSave: false });
  }

  async addStoreToUser(userId: string, storeId: string): Promise<User | null> {
    return this.usermodule
      .findByIdAndUpdate(userId, { storeIds: storeId }, { new: true })
      .populate('storeIds')
      .exec();
  }
}
