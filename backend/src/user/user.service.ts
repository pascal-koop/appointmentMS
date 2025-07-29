import { Injectable, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './user.dto';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';
import { PrismaErrorHandler } from '../common/utils/prisma-error-handler.util';
import { Users } from '@generated/prisma';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  // Helper method to check if a user already exists
  async findByEmail(email: string): Promise<Users | null> {
    return this.prisma.users.findUnique({
      where: { email },
    });
  }

  async create(data: CreateUserDto): Promise<Users> {
    console.log(data);

    try {
      // First, check if a user with this email already exists
      const existingUser = await this.findByEmail(data.email);
      if (existingUser) {
        throw new ConflictException('A user with this email already exists');
      }

      const hashedPassword = await bcrypt.hash(data.password, 10);

      return this.prisma.users.create({
        data: {
          email: data.email,
          phone: data.phone,
          first_name: data.firstName,
          last_name: data.lastName,
          password_hash: hashedPassword,
        },
      });
    } catch (error: unknown) {
      // If it's already a ConflictException, re-throw it
      if (error instanceof ConflictException) {
        throw error;
      }

      // Handle other Prisma errors
      PrismaErrorHandler.handle(error);
    }
  }
}
