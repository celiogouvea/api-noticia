import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): string {
    const text = "API for communication between systems, that is, this project is premised on the creation of a base system for integration between systems<br/> In which this project will serve as a foundation for larger projects without the need to create a project from scratch with the creation of: <br/>* Database connection creation <br/>* User resource creation <br/>*JWT login and authentication creation <br/>For the provision of information and services that can be used by another."
    return text;
  }
}
