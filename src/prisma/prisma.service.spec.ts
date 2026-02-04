import { Test, type TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  let service: PrismaService;

  beforeEach(async () => {
    process.env.DATABASE_URL =
      process.env.DATABASE_URL || 'mysql://user:pass@localhost:3306/db';
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('throws when DATABASE_URL is missing', () => {
    const previousUrl = process.env.DATABASE_URL;
    delete process.env.DATABASE_URL;

    expect(() => new PrismaService()).toThrow(
      'DATABASE_URL is required to initialize PrismaClient.',
    );

    process.env.DATABASE_URL = previousUrl;
  });
});
