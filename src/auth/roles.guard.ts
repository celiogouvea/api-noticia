import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";

@Injectable()
export class AdminRolesGuards implements CanActivate {

    constructor(private readonly userService: UserService,){}

    async canActivate(context: ExecutionContext) {

        const request =  context.switchToHttp().getRequest();
        if (request?.user ) {
            const{role}= request.user;
            if(role === "admin"){
                return true;
            }else{
                return false;
            }
        }
        return false;
    }
}

@Injectable()
export class SuperRolesGuards implements CanActivate {

    constructor(private readonly userService: UserService,){}

    async canActivate(context: ExecutionContext) {

        const request =  context.switchToHttp().getRequest();
        if (request?.user ) {
            const{role}= request.user;
            if(role === "super"){
                return true;
            }else{
                return false;
            }
        }
        return false;
    }
}
