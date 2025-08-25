export class CreateUserDto {
  email: string;
  password: string;
  firstName: string;
  lastName?: string;
  phone: string;
  created_at: Date;
}

export class GetUserDto {
  email: string;
  firstName: string;
  lastName?: string;
  phone: string;
}

export class UpdateUserDto {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}
