import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatsGateway } from './chats.gateway';
import { Chatting, ChattinggSchema } from './models/chattings.model';
import { Socket, SocketSchema } from './models/sockets.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Chatting.name, schema: ChattinggSchema },
      { name: Socket.name, schema: SocketSchema },
    ]),
  ],
  providers: [ChatsGateway],
})
export class ChatsModule {}
