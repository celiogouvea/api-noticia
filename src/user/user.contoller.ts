import {
  Body,
  Param,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
} from "@nestjs/common";
import { resultDto } from "src/dto/result.dto";
import { userCreateDto } from "./dto/user.create.dto";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(":id")
  async find(@Param("id") id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post()
  async create(@Body() data: userCreateDto): Promise<resultDto> {
    return this.userService.create(data);
  }

  @Put(":id")
  update(@Param("id") id: number, @Body() data: userCreateDto): Promise<any> {
    return this.userService.update(id, data);
  }

  @Delete(":id")
  delete(@Param("id") id: number) {
    return this.userService.delete(id);
  }

  @Patch(":id")
  deleteLogic(@Param("id") id: number) {
    return this.userService.deleteLogic(id);
  }
}
