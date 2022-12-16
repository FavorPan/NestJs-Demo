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
  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  // 查找单个用户
  async findOneById(_id: string): Promise<User> {
    return await this.userModel.findById(_id);
  }

  // 根据用户名查找单个用户
  async findOneByUserName(userName: string): Promise<User> {
    return await this.userModel.findOne({ userName: userName });
  }

  // 添加单个用户
  async addOne(body: CreateUserDTO): Promise<void> {
    await this.userModel.create(body);
  }

  // 编辑单个用户
  async editOne(_id: string, body: EditUserDTO): Promise<void> {
    await this.userModel.findByIdAndUpdate(_id, body);
  }

  // 删除单个用户
  async deleteOne(_id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(_id);
  }
}
