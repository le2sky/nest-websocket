import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({ namespace: 'chats' })
export class ChatsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger = new Logger('chat');
  constructor() {
    this.logger.log('constructor init');
  }

  afterInit(server: any) {
    this.logger.log('gateway init');
  }

  handleConnection(@ConnectedSocket() socket: Socket) {
    this.logger.log(`connection created:${socket.id} ${socket.nsp.name}`);
  }

  handleDisconnect(@ConnectedSocket() socket: Socket) {
    this.logger.log(`disconnect: ${socket.id}`);
  }

  @SubscribeMessage('new_user')
  handlerNewUser(
    @MessageBody() username: string,
    @ConnectedSocket() socket: Socket,
  ): string {
    socket.broadcast.emit('user_connected', username);
    return username;
  }
}
