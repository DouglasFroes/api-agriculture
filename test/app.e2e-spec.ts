import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('GET /producers', async () => {
    const res = await request(app.getHttpServer()).get('/producers');
    expect([200, 204]).toContain(res.status);
  });

  it('GET /properties', async () => {
    const res = await request(app.getHttpServer()).get('/properties');
    expect([200, 204]).toContain(res.status);
  });

  it('GET /crops', async () => {
    const res = await request(app.getHttpServer()).get('/crops');
    expect([200, 204]).toContain(res.status);
  });
});
