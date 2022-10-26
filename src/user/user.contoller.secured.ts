import {
  Body,
  Param,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  UseGuards
} from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { AdminRolesGuards, SuperRolesGuards} from "src/auth/roles.guard";
import { resultDto } from "src/dto/result.dto";
import { userDto } from "./dto/user.dto";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@Controller("userSecured")
export class UserControllerSecured {
  constructor(
    private readonly userService: UserService
    ) {}

 

  @UseGuards(JwtAuthGuard, AdminRolesGuards || SuperRolesGuards)
  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll(1);
  }

  @UseGuards(JwtAuthGuard, AdminRolesGuards || SuperRolesGuards)
  @Get(":id")
  async find(@Param("id") id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, AdminRolesGuards || SuperRolesGuards)
  @Post('admin')
  async createAdmin(@Body() data: userDto): Promise<resultDto> {
    data.role = "admin";
    return this.userService.create(data);
  }

  @UseGuards(JwtAuthGuard, SuperRolesGuards)
  @Post('super')
  async createSuper(@Body() data: userDto): Promise<resultDto> {
    data.role = "super";
    return this.userService.create(data);
  }

  @UseGuards(JwtAuthGuard, AdminRolesGuards || SuperRolesGuards)
  @Put(":id")
  update(@Param("id") id: number, @Body() data: userDto): Promise<any> {
    return this.userService.update(id, data);
  }

  @UseGuards(JwtAuthGuard, SuperRolesGuards)
  @Delete(":id")
  delete(@Param("id") id: number) {
    return this.userService.delete(id);
  }

  @UseGuards(JwtAuthGuard, AdminRolesGuards || SuperRolesGuards)
  @Patch(":id")
  deleteLogic(@Param("id") id: number) {
    return this.userService.deleteLogic(id);
  }
}
