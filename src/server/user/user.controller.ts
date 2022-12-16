import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreateUserDTO, EditUserDTO } from "./user.dto";
import { User, IResponse } from "./user.interface";
import { UserService } from "./user.service";
import { makeSalt, encryptPassword } from "src/utils/cryptogram";
import { randomUUID } from "crypto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  // GET /user/getAll
  @Get("getAll")
  async findAll(): Promise<IResponse<User[]>> {
    try {
      const users = await this.userService.findAll();
      return {
        code: 200,
        data: users,
        msg: "Success",
      };
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  // GET /user/:_id
  @Get(":_id")
  async findOneById(@Param("_id") _id: string): Promise<IResponse<User>> {
    try {
      const user = await this.userService.findOneById(_id);
      return {
        code: 200,
        data: user,
        msg: "Success",
      };
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  // GET /user/:userName
  @Get(":userName")
  async findOneByUserName(@Param("userName") userName: string): Promise<IResponse<User>> {
    if (!userName) {
      return {
        code: 400,
        msg: "请输入用户名",
      };
    }
    try {
      const user = await this.userService.findOneByUserName(userName);
      return {
        code: 200,
        data: user,
        msg: "Success",
      };
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  // POST /user/add
  @Post("add")
  async addOne(@Body() body: CreateUserDTO): Promise<IResponse> {
    try {
      await this.userService.addOne(body);
      return {
        code: 200,
        msg: "Success",
      };
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  // PUT /user/:_id
  @Put(":_id")
  async editOne(@Param("_id") _id: string, @Body() body: EditUserDTO): Promise<IResponse> {
    try {
      await this.userService.editOne(_id, body);
      return {
        code: 200,
        msg: "Success",
      };
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  // DELETE /user/:_id
  @Delete(":_id")
  async deleteOne(@Param("_id") _id: string): Promise<IResponse> {
    try {
      await this.userService.deleteOne(_id);
      return {
        code: 200,
        msg: "Success",
      };
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  // POST /user/register
  @Post("register")
  async register(@Body() body: EditUserDTO) {
    const { user_name, password } = body;
    const user = await this.findOneByUserName(user_name);
    if (user) {
      return {
        code: 400,
        msg: "用户已存在",
      };
    }
    const salt = makeSalt(); // 制作密码盐
    const hashPwd = encryptPassword(password, salt); // 加密密码
    try {
      await this.addOne({ _id: randomUUID(), user_name, password: hashPwd, passwordSalt: salt });
      return {
        code: 200,
        msg: "新增成功",
      };
    } catch (err) {
      return {
        code: 500,
        msg: `Service error: ${err}`,
      };
    }
  }
}
