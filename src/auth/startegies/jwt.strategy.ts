import { PassportStrategy } from "@nestjs/passport";
import {Injectable} from '@nestjs/common';
import {Strategy, ExtractJwt}  from 'passport-jwt'

export class  JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrkey: process.env.USER_JWT_SECRET_KEY
        })
    }

    async validate(payload:any){
        return {userId: payload.sub, email: payload.email}
    }
}