import { IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";
import { RoomMessagesHelper } from "../helpers/roommessages.helper";
import { JoinRoomDto } from "./joinroom.dto";
import { MeetMessagesHelpers } from "src/meet/helpers/meet.helpers";

export class UpdateUserPositionDto extends JoinRoomDto{
    
    @IsNumber({}, {message: MeetMessagesHelpers.UPDATE_XY_NOT_VALID})
    @Min(0, {message: MeetMessagesHelpers.UPDATE_XY_NOT_VALID})
    @Max(8, {message: MeetMessagesHelpers.UPDATE_XY_NOT_VALID})
    x: number;

    @IsNumber({}, {message: MeetMessagesHelpers.UPDATE_XY_NOT_VALID})
    @Min(0, {message: MeetMessagesHelpers.UPDATE_XY_NOT_VALID})
    @Max(8, {message: MeetMessagesHelpers.UPDATE_XY_NOT_VALID})
    y:number;

    @IsString({message: MeetMessagesHelpers.UPDATE_ORIENTATION_NOT_VALID})
    orientation: string;
}