import { Logger } from '@nestjs/common';
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  }
})
export class AppGateway {

  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger("AppGateway");

  @SubscribeMessage('message')
  onEvent(client: any, payload: any): string {
    return 'Hello world!';
  }

  @SubscribeMessage('text:update')
  onTextUpdate(@MessageBody() text: string) : void {
    console.log("client: text");

    this.server.emit('text:update', text);
  }

  @SubscribeMessage('reactions:react')
  onReaction(@MessageBody() text: string) : void {
    console.log("client: reaction");

    this.server.emit('reactions:react', text);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
    // console.log(client);
  }

}
