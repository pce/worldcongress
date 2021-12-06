import { Logger } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

import { Server, Socket } from 'ws';

/**
 * example: https://github.com/nestjs/nest/blob/master/sample/16-gateways-ws/src/events/events.gateway.ts
 */
@WebSocketGateway(8080)
export class AppGateway {

  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger("AppGateway");

  @SubscribeMessage('message')
  onEvent(client: any, payload: any): string {
    return 'Hello world!';
  }

  @SubscribeMessage('text')
  onText(client: any, payload: any): string {
    // Merge 
    return payload;
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

}
