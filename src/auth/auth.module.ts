import {Module} from '@nestjs/common'
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/schemas/user.module';
import { JwtStrategy } from './startegies/jwt.strategy';
import {JwtModule} from 'passport-jwt'


@Module({
    imports:[
        UserModule,
        JwtModule.register({
            secret: process.env.USER_JWT_SECRET_KEY
        })
    ],
    controllers:[AuthController],
    providers:[AuthService, JwtStrategy]
})
export class AuthModule{}