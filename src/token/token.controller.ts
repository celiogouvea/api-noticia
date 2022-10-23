import { Body, Controller, Put } from "@nestjs/common";
import { refreshTokenDto } from "./dto/refresh.token.dto";
import { TokenService } from "./token.service";



@Controller('token')
export class TokenController {
    constructor(
        private tokenService: TokenService
    ) {}

    @Put()
    async refresh(@Body() data: refreshTokenDto){
        return this.tokenService.refreshToken(data.oldToken);
    }





}