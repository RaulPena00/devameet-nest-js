import { IsArray, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength, ValidateNested } from "class-validator";
import { CreateMeetDto } from "./createmeet.dto";
import { MeetMessagesHelpers } from "../helpers/meet.helpers";
import { Type } from "class-transformer";

export class UpdateMeetDto extends CreateMeetDto{

    @IsArray({message: MeetMessagesHelpers.UPDATE_OBJECT_NAME_NOT_VALID})
    @Type(() => UpdateMeetObjectDto)
    @ValidateNested({each: true})
    objects: Array<UpdateMeetObjectDto>
} 

export class UpdateMeetObjectDto{
    @IsNotEmpty({message: MeetMessagesHelpers.UPDATE_OBJECT_NAME_NOT_VALID})
    name:string;

    @IsNumber({}, {message: MeetMessagesHelpers.UPDATE_XY_NOT_VALID})
    @MinLength(0, {message: MeetMessagesHelpers.UPDATE_XY_NOT_VALID})
    @MaxLength(0, {message: MeetMessagesHelpers.UPDATE_XY_NOT_VALID})
    x: number;

    @IsNumber({}, {message: MeetMessagesHelpers.UPDATE_XY_NOT_VALID})
    @MinLength(0, {message: MeetMessagesHelpers.UPDATE_XY_NOT_VALID})
    @MaxLength(0, {message: MeetMessagesHelpers.UPDATE_XY_NOT_VALID})
    y: number;

    @IsNumber({}, {message: MeetMessagesHelpers.UPDATE_XY_NOT_VALID})
    zIndex: number;
    
    @IsString({message: MeetMessagesHelpers.UPDATE_XY_NOT_VALID})
    orientation: string;

}