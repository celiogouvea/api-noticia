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

  async findAll(status: number): Promise<User[]> {
    if (status === 0) {
      const users = await this.userRepository.find({where:{status: true}});
      return users.map(user => { 
        delete user.password;
        delete user.status;
        delete user.role;
        return user;
      });
    }else{
      const users = await this.userRepository.find();
      return users.map(user => { 
        delete user.password;
        delete user.status;
        delete user.role;
        return user;
      });
    }
    
  }

  async findOne(id: number): Promise<User> {
    const user =  await this.userRepository.findOneBy({ id: id });
    const u = new User;
    u.id = user.id;
    u.name = user.name;
    u.username = user.username;
    u.tel = user.tel;
    u.email = user.email;
    u.created_at = user.created_at;
    return u;
  }

  async create(data: userDto): Promise<resultDto> {
    const hash = bcrypt.hashSync(data.password,8);
    data.password = hash;
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
