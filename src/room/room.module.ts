import { Module } from '@nestjs/common'; 
import { MeetModule } from 'src/meet/meet.module'; 
import { RoomController } from './room.controller'; 
import { RoomService } from './room.service'; 
import { MongooseModule } from '@nestjs/mongoose'; 
import { PositionSchema, Position,  } from './schemas/position.schema'; 
import { UserModule } from 'src/user/schemas/user.module';
import { RoomGateway } from './room.gateway';


@Module({ 
 imports: [MeetModule, UserModule, MongooseModule.forFeature([ 
  { name: Position.name, schema: PositionSchema } 
 ])], 
 controllers: [RoomController], 
 providers: [RoomService, RoomGateway] 
}) 
export class RoomModule {}