import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Meet, MeetDocument } from './schemas/meet.schema';
import { UserService } from 'src/user/schemas/user.service';
import { GetMeetDto } from './dto/getmeet.dto';
import { CreateMeetDto } from './dto/createmeet.dto';
import { generateLink } from './helpers/linkgenerator.helper';

@Injectable()
export class MeetService {
    private readonly logger = new Logger(MeetService.name);

    constructor(
        @InjectModel(Meet.name) private readonly model: Model<MeetDocument>,
        private readonly userService: UserService
    ){}

    async getMeetByUser(userId: String){
        this.logger.debug('getMeetsByUser - ' + userId);
        return await this.model.find({user: userId});
    }

    async createMeet(userId: string, dto:CreateMeetDto){
        this.logger.debug('createMeet - ' + userId);

        const user = await this.userService.getUserById(userId);

        const meet = {
            ...dto,
            user,
            link: generateLink()
        }
        const createdMeet = new this.model(meet);
        return await createdMeet.save();
    }
    async deleteMeetByUser(userId: String, meetId:string){
        this.logger.debug(`deleteMeetsByUser -  ${userId} - ${meetId}`);
        return await this.model.find({user: userId, _id: meetId});
    }
}
