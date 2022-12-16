import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDTO, EditUserDTO } from "./user.dto";
import { User, IResponse } from "./user.interface";
import { makeSalt, encryptPassword } from "src/utils/cryptogram";
import { randomUUID } from "crypto";

@Injectable()
export class UserService {
  constructor(@InjectModel("Users") private readonly userModel: Model<User>) {}

  // 查找所有用户
  async findAll(): Promise<IResponse<User[]>> {
    try {
      const users = await this.userModel.find();
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

  // 查找单个用户
  async findOneById(_id: string): Promise<IResponse<User>> {
    try {
      const user = await this.userModel.findById(_id);
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

  // 根据用户名查找单个用户
  async findOneByUserName(userName: string): Promise<IResponse<User>> {
    if (!userName) {
      return {
        code: 400,
        msg: "请输入用户名",
      };
    }
    try {
      return await this.userModel.findOne({ user_name: userName });
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  // 添加单个用户
  async addOne(body: CreateUserDTO): Promise<IResponse> {
    try {
      await this.userModel.create(body);
      return {
        code: 200,
        msg: "Success",
      };
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  // 编辑单个用户
  async editOne(_id: string, body: EditUserDTO): Promise<IResponse> {
    try {
      await this.userModel.findByIdAndUpdate(_id, body);
      return {
        code: 200,
        msg: "Success",
      };
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  // 删除单个用户
  async deleteOne(_id: string): Promise<IResponse> {
    try {
      await this.userModel.findByIdAndDelete(_id);
      return {
        code: 200,
        msg: "Success",
      };
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  // 注册
  async register(body: EditUserDTO): Promise<IResponse> {
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
      await this.addOne({ _id: randomUUID(), user_name, password: hashPwd });
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
