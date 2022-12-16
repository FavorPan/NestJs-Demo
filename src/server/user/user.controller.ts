import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreateUserDTO, EditUserDTO } from "./user.dto";
import { User, IResponse } from "./user.interface";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  // GET /user/users
  @Get("users")
  async findAll(): Promise<IResponse<User[]>> {
    return await this.userService.findAll();
  }

  // GET /user/:_id
  @Get(":_id")
  async findOneById(@Param("_id") _id: string): Promise<IResponse<User>> {
    return await this.userService.findOneById(_id);
  }

  // POST /user
  @Post()
  async addOne(@Body() body: CreateUserDTO): Promise<IResponse> {
    return await this.userService.addOne(body);
  }

  // PUT /user/:_id
  @Put(":_id")
  async editOne(@Param("_id") _id: string, @Body() body: EditUserDTO): Promise<IResponse> {
    return await this.userService.editOne(_id, body);
  }

  // DELETE /user/:_id
  @Delete(":_id")
  async deleteOne(@Param("_id") _id: string): Promise<IResponse> {
    return await this.userService.deleteOne(_id);
  }

  @Post("register")
  async register(@Body() body: EditUserDTO) {
    return await this.userService.register(body);
  }
}
