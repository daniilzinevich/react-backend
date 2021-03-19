import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MGSchema } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = User & Document;

@Schema()
export class User {
  @ApiProperty()
  @Prop()
  name: string;

  @ApiProperty({ type: () => [User] })
  @Prop({ type: [{ type: MGSchema.Types.ObjectId, ref: 'User' }] })
  friends: User[];
}

export const UserSchema = SchemaFactory.createForClass(User);
