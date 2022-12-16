import { Document } from "mongoose";

export interface User extends Document {
  readonly _id: string;
  readonly userName: string;
  readonly password: string;
  readonly passwordSalt: string;
}

export interface IResponse<T = unknown> {
  code: number;
  data?: T;
  msg: string;
}
