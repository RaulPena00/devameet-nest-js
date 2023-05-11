import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/schemas/user.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt.guard';

@Module({
  imports: [
    AuthModule, 
    ConfigModule.forRoot(), 
    MongooseModule.forRoot(process.env.DATABASE_URL),
    UserModule],
  controllers: [],
  providers: [
    {provide: APP_GUARD, useClass: JwtAuthGuard}
  ],
})
export class AppModule {}
