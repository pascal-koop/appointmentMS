export class TCreateUserDto {
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

export class TUpdateUserDto {
  email?: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
}
