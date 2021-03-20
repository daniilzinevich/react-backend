import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MGSchema } from 'mongoose';
import { User } from '../user/user.schema';
import { ApiProperty } from '@nestjs/swagger';

export type PostDocument = Post & Document;

@Schema()
export class Post {
  @ApiProperty()
  @Prop()
  message: string;

  @ApiProperty()
  @Prop({ type: { type: MGSchema.Types.ObjectId, ref: 'User' } })
  author: User;
}

export const PostSchema = SchemaFactory.createForClass(Post);
