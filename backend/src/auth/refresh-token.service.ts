import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { randomBytes } from 'crypto';

@Injectable()
export class RefreshTokenService {
  constructor(private prisma: PrismaService) {}

  async generateRefreshToken(userId: string): Promise<string> {
    // Alte Refresh Tokens für diesen User widerrufen
    await this.revokeUserTokens(userId);
    const userTokens = await this.prisma.refreshToken.findMany({
      where: { user_id: userId, is_revoked: false },
      orderBy: { created_at: 'desc' },
    });
    if (userTokens.length >= 3) {
      const toDelete = userTokens.slice(2);
      await this.prisma.refreshToken.deleteMany({
        where: { id: { in: toDelete.map((t) => t.id) } },
      });
    }
    // Neuen Token generieren
    const token = randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 Tage gültig

    await this.prisma.refreshToken.create({
      data: {
        token,
        user_id: userId,
        expires_at: expiresAt,
      },
    });

    return token;
  }

  async validateRefreshToken(token: string): Promise<string | null> {
    const refreshToken = await this.prisma.refreshToken.findUnique({
      where: { token },
      include: { user: true },
    });

    if (
      !refreshToken ||
      refreshToken.is_revoked ||
      refreshToken.expires_at < new Date()
    ) {
      return null;
    }

    return refreshToken.user_id;
  }

  async revokeToken(token: string): Promise<void> {
    await this.prisma.refreshToken.update({
      where: { token },
      data: { is_revoked: true },
    });
  }

  async revokeUserTokens(userId: string): Promise<void> {
    await this.prisma.refreshToken.updateMany({
      where: { user_id: userId },
      data: { is_revoked: true },
    });
  }
  async cleanupExpiredTokens(): Promise<number> {
    const result = await this.prisma.refreshToken.deleteMany({
      where: {
        OR: [{ is_revoked: true }, { expires_at: { lt: new Date() } }],
      },
    });

    console.log(`🗑️ Deleted ${result.count} expired tokens`);
    return result.count;
  }
}
