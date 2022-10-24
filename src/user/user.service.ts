import { Injectable, Inject } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { userDto } from "./dto/user.dto";
import { resultDto } from "src/dto/result.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(
    @Inject("USER_REPOSITORY")
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user =  await this.userRepository.findOneBy({ id: id });
    const { password, ...result } = user;
    return user;
  }

  async create(data: userDto): Promise<resultDto> {
    const hash = bcrypt.hashSync(data.password,8);
    data.password = hash;

    console.log(data);
    
    return <resultDto>{
      status: true,
      description: "created success",
    }
    /*
    return await this.userRepository
      .save(data)
      .then((result) => {
        return <resultDto>{
          status: true,
          description: "created success",
        };
      })
      .catch((result) => {
        return <resultDto>{
          status: false,
          description: "created error",
        };
      });
      */
  }

  async update(id: number, noticia: userDto): Promise<resultDto> {
    const result = await this.userRepository.update(id, noticia);
    if (result.affected === 1) {
      return <resultDto>{
        status: true,
        description: "updated success",
      };
    } else {
      return <resultDto>{
        status: false,
        description: "updated error",
      };
    }
  }

  async delete(id: number): Promise<resultDto> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 1) {
      return <resultDto>{
        status: true,
        description: "destroyed success",
      };
    } else {
      return <resultDto>{
        status: false,
        description: "destroyed error",
      };
    }
  }

  async deleteLogic(id: number): Promise<resultDto> {
    const result = await this.userRepository
      .createQueryBuilder()
      .update(User)
      .set({ status: false })
      .where("id = :id", { id: id })
      .execute();
    if (result.affected === 1) {
      return <resultDto>{
        status: true,
        description: "deleted success",
      };
    } else {
      return <resultDto>{
        status: false,
        description: "deleted error",
      };
    }
  }

  async findLogin(username: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({username : username});
  }
}
