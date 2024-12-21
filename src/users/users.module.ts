import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './entities/user.entity';
import { UploadModule } from 'src/upload/upload.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'users', schema: UserSchema }]),UploadModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersService]
})
export class UsersModule {}
