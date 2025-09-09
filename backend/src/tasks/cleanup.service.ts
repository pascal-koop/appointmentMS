import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { RefreshTokenService } from '../auth/refresh-token.service';

@Injectable()
export class CleanupService {
  constructor(private refreshTokenService: RefreshTokenService) {}

  // Täglich um 2 Uhr morgens
  @Cron('0 0 * * 0') // every sunday at midnight
  async cleanupExpiredTokens() {
    console.log('🧹 Starting token cleanup...');

    try {
      await this.refreshTokenService.cleanupExpiredTokens();
      console.log('✅ Token cleanup completed');
    } catch (error) {
      console.error('❌ Token cleanup failed:', error);
    }
  }
}
