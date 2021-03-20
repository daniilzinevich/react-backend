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

  async findLikedByUser(id): Promise<Array<Post>> {
    const user = await this.userModel.findById(id).exec();
    return this.postModel.find({ likes: user }).exec();
  }

  async likePost(userId, postId) {
    const user = await this.userModel.findById(userId).exec();
    const isLiked = await this.postModel.find({ _id: postId, likes: user }).count();
    if (isLiked) {
      throw new BadRequestException('Post already liked');
    } else {
      const result = await this.postModel.update(
        { _id: postId },
        { $push: { likes: userId } }
      );
      if (!result.nModified) {
        throw new NotFoundException('Post not found')
      }
    }
  }

  async unlikePost(userId, postId) {
    const user = await this.userModel.findById(userId).exec();
    const isLiked = await this.postModel.find({ _id: postId, likes: user }).count();
    if (!isLiked) {
      throw new BadRequestException('Post was not liked');
    } else {
      const result = await this.postModel.update(
        { _id: postId },
        { $pull: { likes: userId } }
      ).exec();
      if (!result.nModified) {
        throw new NotFoundException('Post was not liked')
      }
    }
  }
}
