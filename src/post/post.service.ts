import { Model } from 'mongoose';
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './post.schema';
import { CreatePostDto } from './create-post.dto';
import { User, UserDocument } from 'src/user/user.schema';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>, @InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const createdPost = new this.postModel(createPostDto);
    return createdPost.save();
  }

  async findByUser(id): Promise<Array<Post>> {
    const user = await this.userModel.findById(id).exec();
    return this.postModel.find({ author: user }).exec();
  }
}
