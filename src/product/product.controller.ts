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
  UnauthorizedException,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { Guard, roleGuard } from 'src/auth/guards/jwt-Guard';
import { CreateProductDto } from './dto/create-product.dto';
import { UsersService } from 'src/users/users.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from 'src/upload/upload.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService, private userser: UsersService,private uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(Guard)
  async create(@Body() productData: CreateProductDto, @Request() req, @UploadedFile() file: Express.Multer.File,) { 
   const {user}=req
   const userid=await this.userser.findOne(user.payload.payload._id)
   if (userid.role!='store_owner') {
    throw new UnauthorizedException("u have to be a store_owner to create product")
   }
   if (file) {
    const url = await this.uploadService.uploadImage(file);
    productData.image.push(url)
  }
    return await this.productService.create(productData, req);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }
  @Get("find/cat/product")
  findcat(@Query()cat) {
    const {category} =cat
    return this.productService.findbycat(category);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.productService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateData: Partial<Product>) {
    return this.productService.update(id, updateData);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productService.delete(id);
  }
  @Get()
  findByStore(@Query('find/storeId') storeId: string) {
    return this.productService.findByStore(storeId);
  }
}
