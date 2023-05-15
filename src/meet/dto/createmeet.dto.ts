import { Matches, MinLength } from "class-validator";
import { MeetMessagesHelpers } from "../helpers/meet.helpers";

export class CreateMeetDto{
    @MinLength(2, {message: MeetMessagesHelpers.CREATE_NAME_NOT_VALID})
    name: string;

    @Matches(/[0-9A-Fa-f]{3,6}/, {message: MeetMessagesHelpers.CREATE_COLOR_NOT_VALID})
    color: string;
}