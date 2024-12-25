import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { StoreModule } from './store/store.module';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { JwtModule } from '@nestjs/jwt';
import { UploadModule } from './upload/upload.module';
import { OrderModule } from './order/order.module';
import { CartItemModule } from './cart-item/cart-item.module';
import { OrderItemsModule } from './order-items/order-items.module';
import { FormsModule } from './forms/forms.module';
import { BoardingModule } from './services/boarding/boarding.module';
import { RegistreationModule } from './services/registreation/registreation.module';
import { TrainingModule } from './services/training/training.module';
import { VeterinaryModule } from './services/veterinary/veterinary.module';
import multer from 'multer';
@Module({
  imports: [
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URI'),
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    StoreModule,
    ProductModule,
    CartModule,
    UploadModule,
    OrderModule,
    CartItemModule,
    OrderItemsModule,
    FormsModule,
    BoardingModule,
    RegistreationModule,
    TrainingModule,
    VeterinaryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
