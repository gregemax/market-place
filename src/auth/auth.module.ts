import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './guards/stratagy';

@Module({
  imports:[UsersModule,  JwtModule.register({
    secret: process.env.JWT_SECRET || 'secretKey', 
    signOptions: { expiresIn: '1d' }, 
  }),],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
})
export class AuthModule {}
