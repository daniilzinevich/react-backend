import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { Message, MessageSchema } from './message.schema';
import { User, UserSchema } from '../user/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }, { name: User.name, schema: UserSchema }])],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
