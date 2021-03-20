import { Controller, Get, Param, Put, Body } from '@nestjs/common';
import { ApiTags,  ApiOkResponse, ApiNotFoundResponse, ApiBody } from '@nestjs/swagger';
import { MessageService } from './message.service';
import { Message } from 'src/message/message.schema';
import { CreateMessageDto } from './create-message.dto';

@ApiTags('message')
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}
  
  @Put(':id/:recieverId')
  @ApiBody({ type: CreateMessageDto })
  sendMessage(
    @Param('id') id: string,
    @Param('recieverId') recieverId: string,
    @Body('message') message: string
  ) {
    return this.messageService.create({ message, author: id, receiver: recieverId });
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Returns all users.',  type: [Message] })
  @ApiNotFoundResponse({ description: 'User does not exists' })
  getMessage(@Param('id') id: string) {
    return this.messageService.findByUser(id);
  }
}