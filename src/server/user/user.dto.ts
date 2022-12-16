export class CreateUserDTO {
  readonly _id: string;
  readonly userName: string;
  readonly password: string;
  readonly passwordSalt: string;
}

export class EditUserDTO {
  readonly userName: string;
  readonly password: string;
}
