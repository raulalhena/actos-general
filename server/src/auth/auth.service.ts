import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from '../users/users.service';
import { GetUserLoginDto } from './dto/get-user-login.dto';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
    ) {};

  async login(getUserLoginDto: GetUserLoginDto) {
    try {
      const { password, email } = getUserLoginDto;
      const user = await this.userService.findByEmail(email);
      if (!user) throw new HttpException('No se ha encontrado el usuario.', HttpStatus.NOT_FOUND);

      const userPassword = user.password;

      const checkPassword = await compare(password, userPassword);
      if (!checkPassword) throw new HttpException('Contraseña incorrecta.', HttpStatus.FORBIDDEN);


      const payload = {
        sub: user._id,
        email: user.email
      }

      const returnedUserData = {
        _id: user._id,
        role: user.role,
        name: user.name,
        surname: user.surname,
        email: user.email
      }

      return { 
        user: returnedUserData,
        accessToken: await this.jwtService.signAsync(payload)
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async create(createAuthDto: CreateAuthDto) {
    try {
      const { password } = createAuthDto;
      const hashPassword = await hash(password, 10);
      return this.userService.create({
        ...createAuthDto, password: hashPassword
      });
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
