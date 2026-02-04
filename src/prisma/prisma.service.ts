import {
  Injectable,
  type OnModuleDestroy,
  type OnModuleInit,
} from '@nestjs/common';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl) {
      throw new Error('DATABASE_URL is required to initialize PrismaClient.');
    }

    // Validate URL format
    try {
      new URL(databaseUrl);
    } catch {
      throw new Error('DATABASE_URL must be a valid URL.');
    }

    // Validate database type for MariaDB adapter
    if (!databaseUrl.includes('mysql') && !databaseUrl.includes('mariadb')) {
      throw new Error(
        'DATABASE_URL must be a MySQL/MariaDB connection string for MariaDB adapter.',
      );
    }

    super({
      adapter: new PrismaMariaDb(databaseUrl),
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
