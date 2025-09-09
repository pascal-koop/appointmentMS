import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from 'generated/prisma';
export class PrismaErrorHandler {
  static handle(error: unknown): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Resource not found');
      }
      if (error.code === 'P2002') {
        throw new ConflictException('Unique constraint failed');
      }
      if (error.code === 'P2003') {
        throw new BadRequestException('Foreign key constraint failed');
      }
      if (error.code === 'P2004') {
        throw new BadRequestException('Invalid input');
      }
      if (error.code === 'P2016') {
        throw new BadRequestException('Record not found');
      }
      if (error.code === 'P2020') {
        throw new BadRequestException('Invalid data');
      }
      throw new BadRequestException(error.meta?.cause || 'Database error');
    }
    throw new BadRequestException('An unexpected error occurred');
  }
}
