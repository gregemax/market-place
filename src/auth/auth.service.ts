import { Injectable } from '@nestjs/common';
import { CreateAuthDto, loginAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/users/users.service';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private userservices: UsersService,
    private jwtService: JwtService,
  ) {}
  async login(loginAuthDto: loginAuthDto) {
    const { email, password } = loginAuthDto;
    const user = await this.userservices.findemail(email);
    const verifypassword = await bcryptjs.compare(password, user.password);
    const token = await this.jwtService.sign({payload:user});
    return {
      user,
      token,
    };
  }
}
