import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MGSchema } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop({ type: [{ type: MGSchema.Types.ObjectId, ref: 'User' }] })
  friends: User[];
}

export const UserSchema = SchemaFactory.createForClass(User);
