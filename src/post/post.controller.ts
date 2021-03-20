import { Controller, Get, Param, Put, Body, Post as NPost } from '@nestjs/common';
import { ApiTags,  ApiOkResponse, ApiNotFoundResponse, ApiBody } from '@nestjs/swagger';
import { PostService } from './post.service';
import { Post } from 'src/post/post.schema';
import { CreatePostDto } from './create-post.dto';

@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}
  
  @Put(':id')
  @ApiBody({ type: CreatePostDto })
  sendPost(
    @Param('id') id: string,
    @Body('message') message: string
  ) {
    return this.postService.create({ message, author: id });
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Returns all users posts.',  type: [Post] })
  @ApiNotFoundResponse({ description: 'User does not exists' })
  getPost(@Param('id') id: string) {
    return this.postService.findByUser(id);
  }

  @Get(':id/liked')
  @ApiOkResponse({ description: 'Returns all users liked posts.',  type: [Post] })
  @ApiNotFoundResponse({ description: 'User does not exists' })
  getLikedPost(@Param('id') id: string) {
    return this.postService.findLikedByUser(id);
  }

  @NPost(':id/:postId/like')
  @ApiOkResponse({ description: 'Post was liked.' })
  @ApiNotFoundResponse({ description: 'Post does not exists' })
  likePost(@Param('id') id: string, @Param('postId') postId: string) {
    return this.postService.likePost(id, postId);
  }

  @NPost(':id/:postId/unlike')
  @ApiOkResponse({ description: 'Post was unliked.' })
  @ApiNotFoundResponse({ description: 'Like does not exists' })
  unlikePost(@Param('id') id: string, @Param('postId') postId: string) {
    return this.postService.unlikePost(id, postId);
  }
}