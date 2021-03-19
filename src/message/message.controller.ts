import { Controller, Get, Param, Put, Body, Post } from '@nestjs/common';
import { ApiTags,  ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { MessageService } from './message.service';
import { Message } from 'src/message/message.schema';

@ApiTags('message')
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}
  
  @Get(':id')
  @ApiOkResponse({ description: 'Returns all users.',  type: [Message] })
  @ApiNotFoundResponse({ description: 'User does not exists' })
  getMessage(@Param('id') id: string) {
    return this.messageService.findByUser(id);
  }
}