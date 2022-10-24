import {
  Body,
  Param,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  UseGuards,
  Request
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "src/auth/auth.service";
import { Roles } from "src/auth/decorators/roles.decorator";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { resultDto } from "src/dto/result.dto";
import { userDto } from "./dto/user.dto";
import { Role } from "./role.enum";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private authService: AuthService
    ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  async find(@Param("id") id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  //@UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() data: userDto): Promise<resultDto> {
    return this.userService.create(data);
  }

  
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('admin')
  @Roles(Role.ADMIN)
  async createAdmin(@Body() data: userDto): Promise<resultDto> {
    const role = Role.ADMIN;
    data.role = role;
    return this.userService.create(data);
  }

  @Roles(Role.SUPER)
  @UseGuards(JwtAuthGuard)
  @Post('super')
  async createSuper(@Body() data: userDto): Promise<resultDto> {
    const role = Role.SUPER;
    data.role = role;
    return this.userService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Put(":id")
  update(@Param("id") id: number, @Body() data: userDto): Promise<any> {
    return this.userService.update(id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  delete(@Param("id") id: number) {
    return this.userService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  deleteLogic(@Param("id") id: number) {
    return this.userService.deleteLogic(id);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
