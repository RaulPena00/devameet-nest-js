import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose"
import { UserSchema, User } from "./use.schema";
import { UserService } from "./user.service";

@Module({
    imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}])],
    controllers: [],
    providers: [UserService],
    exports: [MongooseModule, UserService]
})

export class UserModule{}