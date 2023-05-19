import { 
    IsNumber, 
    Min, 
    Max, 
    IsString, 
    IsBoolean 
  } from 'class-validator'; 
import { RoomMessagesHelper } from '../helpers/roommessages.helper';


   
  export class ToglMuteDto { 
    @IsString({ message: RoomMessagesHelper.MUTE_NOT_VALID}) 
    userId: string; 
  
    @IsString({ message: RoomMessagesHelper.MUTE_NOT_VALID}) 
    link: string; 
  
    @IsBoolean({ message:  RoomMessagesHelper.MUTE_NOT_VALID}) 
    muted: boolean; 
  }