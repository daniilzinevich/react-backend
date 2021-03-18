import { Controller, Get, Param, Put, Body, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @Get()
  getAllUsers() {
    return this.userService.findAll()
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.userService.findUser(id);
  }

  @Put()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post(':id/befriend/:friendId')
  befriendUser(@Param('id') id: string, @Param('friendId') friendId: string) {
    return this.userService.befriend(id, friendId);
  }

  @Post(':id/unfriend/:friendId')
  idfriendUser(@Param('id') id: string, @Param('friendId') friendId: string) {
    return this.userService.unfriend(id, friendId);
  }
}