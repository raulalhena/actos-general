import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from '../users/users.service';
import { GetUserLoginDto } from './dto/get-user-login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
    ) {};

  async login(getUserLoginDto: GetUserLoginDto) {
    try {
      const user = await this.userService.findByEmail(getUserLoginDto.email);
      if (user?.password !== getUserLoginDto.password) throw new UnauthorizedException('Invalid credentials.');

      const payload = {
        sub: user.id,
        email: user.email
      }
      
      return {
        access_token: await this.jwtService.signAsync(payload)
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
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
