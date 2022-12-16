export class CreateUserDTO {
  readonly _id: string;
  readonly user_name: string;
  readonly password: string;
  readonly passwordSalt: string;
}

export class EditUserDTO {
  readonly user_name: string;
  readonly password: string;
}
