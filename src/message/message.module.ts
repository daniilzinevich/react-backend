import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { Message, MessageSchema } from '../schemas/message.schema';
import { User, UserSchema } from '../schemas/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }, { name: User.name, schema: UserSchema }])],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
