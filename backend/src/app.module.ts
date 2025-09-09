import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CleanupService } from './tasks/cleanup.service';
import { PrismaService } from './prisma.service';
@Module({
  imports: [UserModule, AuthModule, ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, CleanupService, PrismaService],
})
export class AppModule {}
