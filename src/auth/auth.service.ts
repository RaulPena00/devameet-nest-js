import {BadRequestException, Injectable, Logger} from '@nestjs/common' 
import { LoginDto } from "./dtos/login.dto";
import { MessagesHelper } from "./helpers/messages.helper";
import { RegisterDto } from 'src/user/schemas/dtos/register.dto';
import { UserService } from '../user/schemas/user.service';
import { UserMessagesHelper } from 'src/user/schemas/helpers/messages.helper';
import {JwtService} from 'passport-jwt'

export class AuthService{
    private logger = new Logger(AuthService.name);

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
        ){}

    async login(dto: LoginDto){
        this.logger.debug('login - started')

        const user = await this.userService.getUserByLoginPassword(dto.login, dto.password)
        if(user == null){
            throw new BadRequestException(MessagesHelper.AUTH_PASSWORD_OR_LOGIN_NOT_FOUND)
        }

        const   tokenPayLoad = {email: user.email, sub: user._id};

        return {
            email: user.email,
            name: user.name,
            token: this.jwtService.sing(tokenPayLoad, {secret: process.env.USER_JWT_SECRET_KEY}),
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