import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model, ObjectId } from 'mongoose';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async create(createUserDto: CreateUserDto) {
    try {
      const res = await this.userModel.find({ email: createUserDto.email });
      if (res.length === 1) {
        throw new HttpException('User already exists.', 400);
      } else {
        const newUser = await this.userModel.create(createUserDto)
        return newUser;
      }
    } catch (error) {
      throw error
    }
  }

  findAll() {
    return this.userModel.find();
  }

  async findByEmail(email: string) {
    try {
      const user = await this.userModel.findOne({ email }).lean();
      if(!user) throw new HttpException('No se ha podido encontrar el usuario.', HttpStatus.BAD_REQUEST);
      
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  findById(id: ObjectId) {
    try {
      return this.userModel.findById(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
