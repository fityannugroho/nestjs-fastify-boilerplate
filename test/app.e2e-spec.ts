import type { INestApplication } from '@nestjs/common';
import {
  FastifyAdapter,
  type NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Test, type TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from './../src/app.module.js';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    await app.listen(0);
  });

  afterEach(async () => {
    await app.close();
  });

  it('/health (GET)', () => {
    return request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .expect((res) => {
        expect(res.body.status).toBe('ok');
        expect(res.body.timestamp).toBeDefined();
      });
  });
});
