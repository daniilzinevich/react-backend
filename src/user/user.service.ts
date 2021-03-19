import { Model } from 'mongoose';
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findUser(id): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async befriend(id, friendId) {
    const isFriend = await this.userModel.find({_id: id, friends: friendId}).count();
    if (isFriend) {
      throw new BadRequestException('Already a friend');
    } else {
      const result = await this.userModel.update(
        { _id: id },
        { $push: { friends: friendId } }
      );
      if (!result.nModified) {
        throw new NotFoundException('User not found')
      }
    }
  }

  async unfriend(id, friendId) {
    const result = await this.userModel.update(
      { _id: id },
      { $pull: { friends: friendId } }
    );
    if (!result.nModified) {
      throw new NotFoundException('Not a friend')
    }
  }
}
