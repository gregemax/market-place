import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { store, storeSchema } from './entities/store.entity';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: store.name, schema: storeSchema }]),
    UsersModule
  ],
  controllers: [StoreController],
  providers: [StoreService],
  exports: [StoreService],
})
export class StoreModule {}
