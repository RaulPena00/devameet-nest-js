import { Logger } from '@nestjs/common/services'; 
import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayInit, OnGatewayDisconnect, OnGatewayConnection } from '@nestjs/websockets'; 
import { Socket, Server } from 'socket.io'; 

import { RoomService } from './room.service'; 
import { JoinRoomDto } from './dto/joinroom.dto';
import { UpdateUserPositionDto } from './dto/updateposition.dto';

@WebSocketGateway({ cors: true }) 
export class RoomGateway implements OnGatewayInit, OnGatewayDisconnect, OnGatewayConnection { 
 constructor( 
  private readonly service: RoomService) { } 
 
 @WebSocketServer() wss: Server; 

 private activeSockets: { room: string; id: string, userId: string }[] = []; 
 private logger: Logger = new Logger(RoomGateway.name); 

 afterInit(server: Server) { 
  this.logger.log('Gateway initialized'); 
 } 

 handleConnection(client: any, ...args: any[]) { 
  this.logger.log(`Client id ${client.id} connected;`); 
 } 

 async handleDisconnect(client: Socket) { 
  const existingSocket = this.activeSockets.find( 
   (socket) => socket.id === client.id, 
  ); 

  if (!existingSocket) return; 

  this.activeSockets = this.activeSockets.filter( 
   (socket) => socket.id !== client.id, 
  ); 
  await this.service.deleteUserPosition(client.id); 

  client.broadcast.emit(`${existingSocket.room}-remove-user`, { 
   socketId: client.id, 
  }); 

  this.logger.log(`Client id ${client.id} disconnected;`); 
 } 

 @SubscribeMessage('join') 
 async handleMessage(client: Socket, payload: JoinRoomDto): Promise<void> { 
  const { link, userId } = payload; 
  const existingSocket = this.activeSockets?.find( 
   (socket) => socket.room === link && socket.id === client.id, 
  ); 

  if (!existingSocket) { 
   this.activeSockets.push({ room: link, id: client.id, userId }); 
   const dto = { 
    x: 2, 
    y: 2, 
    orientation: 'down' 
   } as UpdateUserPositionDto; 

   await this.service.updateUserPosition(userId, link, client.id, dto); 
   const users = await this.service.listUsersPosition(link); 
   this.wss.emit(`${link}-update-user-list`, { 
    users 
   }); 

   client.broadcast.emit(`${link}-add-user`, { 
    user: client.id, 
   }); 
  } 

  this.logger.log('Socket client: ' + client.id + ' start to join room: ' + link); 
 } 

 @SubscribeMessage('move') 
 async handleMovement(client: Socket, payload: UpdateUserPositionDto): Promise<void> { 
  const { link, userId, x, y, orientation } = payload; 
  this.logger.log('Socket client: ' + client.id + ' start to join room: ' + link); 
 
  const dto = { 
   x, 
   y, 
   orientation 
  } as UpdateUserPositionDto; 

  await this.service.updateUserPosition(userId, link, client.id, dto); 
  const users = await this.service.listUsersPosition(link); 
  this.wss.emit(`${link}-update-user-list`, { 
   users 
  }); 
 } 
}