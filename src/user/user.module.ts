import { forwardRef, Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { DatabaseModule } from "../database/database.module";
import { UserController } from "./user.contoller";
import { UserControllerSecured } from "./user.contoller.secured";
import { UserProviders } from "./user.providers";
import { UserService } from "./user.service";

@Module({
  imports: [DatabaseModule, forwardRef(()=>AuthModule) ],
  controllers: [UserController, UserControllerSecured],
  providers: [...UserProviders, UserService],
  exports:[UserService]
})
export class UserModule {}
