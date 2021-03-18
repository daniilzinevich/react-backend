import { Controller, Get, Param, Put, Body, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiNotFoundResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { User } from 'src/schemas/user.schema';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @Get()
  @ApiOkResponse({ description: 'Returns all users.',  type: [User] })
  getAllUsers() {
    return this.userService.findAll()
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Returns a user with a given id.', type: User})
  getUser(@Param('id') id: string) {
    return this.userService.findUser(id);
  }

  @Put()
  @ApiOkResponse({ description: 'Returns an id for new user.'})
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post(':id/befriend/:friendId')
  @ApiOkResponse({ description: 'The record has been successfully updated.'})
  @ApiBadRequestResponse({ description: 'Already a friend.'})
  @ApiNotFoundResponse({ description: 'User not found.'})
  befriendUser(@Param('id') id: string, @Param('friendId') friendId: string) {
    return this.userService.befriend(id, friendId);
  }

  @Post(':id/unfriend/:friendId')
  @ApiOkResponse({ description: 'The record has been successfully updated.'})
  @ApiNotFoundResponse({ description: 'Not a friend.'})
  idfriendUser(@Param('id') id: string, @Param('friendId') friendId: string) {
    return this.userService.unfriend(id, friendId);
  }
}