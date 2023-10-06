import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from '../users/users.service';
import { GetUserLoginDto } from './dto/get-user-login.dto';
import { JwtService } from '@nestjs/jwt';
import { log } from 'console';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
    ) {};

  async login(getUserLoginDto: GetUserLoginDto) {
    try {
      const { password, ...user } = await this.userService.findByEmail(getUserLoginDto.email);
      if (password !== getUserLoginDto.password) throw new UnauthorizedException('Credenciales inválidas.');

      const payload = {
        sub: user._id,
        email: user.email
      }

      return { 
        user,
        accessToken: await this.jwtService.signAsync(payload)
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async create(createAuthDto: CreateAuthDto) {
    try {
      return this.userService.create(createAuthDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
