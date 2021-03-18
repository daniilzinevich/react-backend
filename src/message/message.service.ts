import { Model } from 'mongoose';
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message, MessageDocument } from '../schemas/message.schema';
import { CreateMessageDto } from '../dto/create-message.dto';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class MessageService {
  constructor(@InjectModel(Message.name) private messageModel: Model<MessageDocument>, @InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    const createdMessage = new this.messageModel(createMessageDto);
    return createdMessage.save();
  }

  async findByUser(id): Promise<Array<Message>> {
    const user = await this.userModel.findById(id).exec();
    return this.messageModel.find({ receiver: user }).exec();
  }
}
