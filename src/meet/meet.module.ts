import { Module } from '@nestjs/common';
import { MeetController } from './meet.controller';
import { MeetService } from './meet.service';
import { UserService } from 'src/user/schemas/user.service';
import { UserModule } from 'src/user/schemas/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Meet, MeetSchema } from './schemas/meet.schema';
import { MeetObject, MeetObjectSchema } from './schemas/meetobjects.schema';

@Module({
  imports: [UserModule, MongooseModule.forFeature([
    {name:Meet.name, schema: MeetSchema},
    {name:MeetObject.name, schema: MeetObjectSchema},
  ])],
  controllers: [MeetController, UserService],
  providers: [MeetService],
  exports:[MongooseModule, MeetService]
})
export class MeetModule {}
