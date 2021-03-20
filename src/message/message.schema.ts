import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MGSchema } from 'mongoose';
import { User } from '../user/user.schema';
import { ApiProperty } from '@nestjs/swagger';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
  @ApiProperty()
  @Prop()
  message: string;

  @ApiProperty()
  @Prop({ type: MGSchema.Types.ObjectId, ref: 'User' })
  author: User;

  @ApiProperty()
  @Prop({ type: MGSchema.Types.ObjectId, ref: 'User' })
  receiver: User;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
