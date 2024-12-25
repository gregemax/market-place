import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
  Query,
  BadRequestException,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { StoreService } from './store.service';
import { store } from './entities/store.entity';
import { Guard } from 'src/auth/guards/jwt-Guard';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from 'src/upload/upload.service';
import { UsersService } from 'src/users/users.service';

@Controller('stores')
export class StoreController {
  constructor(
    private storeService: StoreService,
    private uploadService: UploadService,
    private userService: UsersService,
  ) {}

  @Post()
  //@UseGuards(Guard)
  create(@Body() storeData: CreateStoreDto) {
  
    
    return this.storeService.create(storeData);
  }

  @Get()
  findAll() {
    return this.storeService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.storeService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateData: UpdateStoreDto) {
    return this.storeService.update(id, updateData);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.storeService.delete(id);
  }
  @Get('find/ownerId')
  findByOwner(@Query('ownerId') ownerId: string) {
    return this.storeService.findByOwner(ownerId);
  }
  @Post('uploadProfile/store')
  @UseGuards(Guard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadprofile(
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ) {
    try {
      const { user } = req;
      console.log('user');
      if (!file) {
        throw new BadRequestException('File is required');
      }
      console.log(user.payload.payload._id.toString);

      const url = await this.uploadService.uploadImage(file);

      return await this.storeService.upload(user, url);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
