import { Controller, Get, Param, Put, Body } from '@nestjs/common';
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
  @ApiOkResponse({ description: 'Returns all users.',  type: [Post] })
  @ApiNotFoundResponse({ description: 'User does not exists' })
  getPost(@Param('id') id: string) {
    return this.postService.findByUser(id);
  }
}