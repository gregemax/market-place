import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from 'src/upload/upload.service';
import { Guard } from 'src/auth/guards/jwt-Guard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly uploadService: UploadService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(id);
  }

  @Post('uploadProfile/user')
  @UseGuards(Guard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadprofile(
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ) {
    const { user } = req;
    console.log('user');
    if (!file) {
      throw new BadRequestException('File is required');
    }
    const url = await this.uploadService.uploadImage(file);
    console.log(url);
    return await this.usersService.update(user.payload.payload._id.toString(), {
      profile: url,
    });
  }
}
