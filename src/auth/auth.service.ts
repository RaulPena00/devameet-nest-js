import {BadRequestException, Injectable, Logger} from '@nestjs/common' 
import { LoginDto } from "./dtos/login.dto";
import { MessagesHelper } from "./helpers/messages.helper";
import { RegisterDto } from 'src/user/schemas/dtos/register.dto';
import { UserService } from '../user/schemas/user.service';
import { UserMessagesHelper } from 'src/user/schemas/helpers/messages.helper';

export class AuthService{
    private logger = new Logger(AuthService.name);

    constructor(private readonly userService: UserService){}

    login(dto: LoginDto){
        this.logger.debug('login - started')
        if(dto.login !== 'teste@teste.com' || dto.password !== 'teste@123'){
            throw new BadRequestException(MessagesHelper.AUTH_PASSWORD_OR_LOGIN_NOT_FOUND)
        }

        return dto;
    }

    async register(dto: RegisterDto){
        if(await this.userService.existsByEmail(dto.email)){
            throw  new BadRequestException(UserMessagesHelper.REGISTER_EXIST_EMAIL_ACCOUNT)
        }

        await this.userService.create(dto)
    }
}