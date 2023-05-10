import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/schemas/user.module';

@Module({
  imports: [
    AuthModule, 
    ConfigModule.forRoot(), 
    MongooseModule.forRoot(process.env.DATABASE_URL),
    UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
