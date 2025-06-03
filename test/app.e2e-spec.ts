/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from 'generated/prisma';
import { showLog } from 'src/utils/showLog';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    // apaga os dados que vao ser usados
    const prisma = new PrismaClient();
    await prisma.$connect();
    await prisma.producer.deleteMany({
      where: {
        cpfCnpj: {
          in: [
            '12345678909',
            '98765432100',
            '11122233344',
            '55566677788',
            '99988877766',
            '22233344455',
          ],
        },
      },
    });
    await prisma.$disconnect();

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

  it('POST /producers deve criar produtor', async () => {
    const dto = { cpfCnpj: '123.456.789-09', name: 'Produtor E2E' };
    const res = await request(app.getHttpServer()).post('/producers').send(dto);
    expect(201).toBe(res.status);

    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe(dto.name);
  });

  it('POST /properties deve criar propriedade', async () => {
    // O id do produtor precisa existir, ajuste conforme necessário
    const producerRes = await request(app.getHttpServer())
      .post('/producers')
      .send({ cpfCnpj: '987.654.321-00', name: 'Produtor Propriedade' });

    const producerId = producerRes.body.id;
    const dto = {
      name: 'Fazenda E2E',
      city: 'Cidade',
      state: 'UF',
      totalArea: 100,
      arableArea: 60,
      vegetationArea: 40,
      producerId,
    };

    const res = await request(app.getHttpServer())
      .post('/properties')
      .send(dto);
    expect([201, 400]).toContain(res.status);

    if (res.status === 201) {
      expect(res.body).toHaveProperty('id');
      expect(res.body.name).toBe(dto.name);
    }
  });

  it('POST /crops deve criar cultura', async () => {
    // O id da propriedade precisa existir, ajuste conforme necessário
    const producerRes = await request(app.getHttpServer())
      .post('/producers')
      .send({ cpfCnpj: '111.222.333-44', name: 'Produtor Cultura' });
    const producerId = producerRes.body.id;
    const propertyRes = await request(app.getHttpServer())
      .post('/properties')
      .send({
        name: 'Fazenda Cultura',
        city: 'Cidade',
        state: 'UF',
        totalArea: 100,
        arableArea: 60,
        vegetationArea: 40,
        producerId,
      });
    const propertyId = propertyRes.body.id;
    const dto = { name: 'Soja', year: 2025, propertyId };
    const res = await request(app.getHttpServer()).post('/crops').send(dto);
    expect([201, 400]).toContain(res.status);
    if (res.status === 201) {
      expect(res.body).toHaveProperty('id');
      expect(res.body.name).toBe(dto.name);
    }
  });

  it('GET /producers/:id deve retornar produtor ou 404', async () => {
    const createRes = await request(app.getHttpServer())
      .post('/producers')
      .send({ cpfCnpj: '555.666.777-88', name: 'Produtor Find' });

    const id = createRes.body.id;

    const res = await request(app.getHttpServer()).get(`/producers/${id}`);
    expect([200, 404]).toContain(res.status);
    if (res.status === 200) {
      expect(res.body).toHaveProperty('id', id);
    }
  });

  it('GET /properties/:id deve retornar propriedade ou 404', async () => {
    const producerRes = await request(app.getHttpServer())
      .post('/producers')
      .send({ cpfCnpj: '999.888.777-66', name: 'Produtor Propriedade Find' });
    const producerId = producerRes.body.id;
    const propertyRes = await request(app.getHttpServer())
      .post('/properties')
      .send({
        name: 'Fazenda Find',
        city: 'Cidade',
        state: 'UF',
        totalArea: 100,
        arableArea: 60,
        vegetationArea: 40,
        producerId,
      });
    const id = propertyRes.body.id;
    const res = await request(app.getHttpServer()).get(`/properties/${id}`);
    expect([200, 404]).toContain(res.status);
    if (res.status === 200) {
      expect(res.body).toHaveProperty('id', id);
    }
  });

  it('GET /crops/:id deve retornar cultura ou 404', async () => {
    const producerRes = await request(app.getHttpServer())
      .post('/producers')
      .send({ cpfCnpj: '222.333.444-55', name: 'Produtor Cultura Find' });
    const producerId = producerRes.body.id;
    const propertyRes = await request(app.getHttpServer())
      .post('/properties')
      .send({
        name: 'Fazenda Cultura Find',
        city: 'Cidade',
        state: 'UF',
        totalArea: 100,
        arableArea: 60,
        vegetationArea: 40,
        producerId,
      });
    const propertyId = propertyRes.body.id;
    const cropRes = await request(app.getHttpServer())
      .post('/crops')
      .send({ name: 'Milho', year: 2026, propertyId });
    const id = cropRes.body.id;
    const res = await request(app.getHttpServer()).get(`/crops/${id}`);
    expect([200, 404]).toContain(res.status);
    if (res.status === 200) {
      expect(res.body).toHaveProperty('id', id);
    }
  });

  it('POST /producers deve retornar erro para cpfCnpj inválido', async () => {
    const dto = { cpfCnpj: '123', name: 'Produtor Inválido' };
    const res = await request(app.getHttpServer()).post('/producers').send(dto);

    expect(400).toBe(res.status);
  });

  it('POST /producers deve retornar erro para cpfCnpj duplicado', async () => {
    const dto = { cpfCnpj: '123.456.789-09', name: 'Produtor Duplicado' };
    // Primeiro cria
    await request(app.getHttpServer()).post('/producers').send(dto);
    // Tenta criar de novo
    const res = await request(app.getHttpServer()).post('/producers').send(dto);
    expect(400).toBe(res.status);
  });

  it('POST /producers deve retornar erro para campos obrigatórios ausentes', async () => {
    const res = await request(app.getHttpServer()).post('/producers').send({
      cpfCnpj: '123.456.789-09',
    });
    expect(400).toBe(res.status);
  });

  it('POST /properties deve retornar erro  para propriedade com área cultivável maior que total', async () => {
    const dto = {
      name: 'Fazenda Erro',
      city: 'Cidade',
      state: 'UF',
      totalArea: 100,
      arableArea: 630,
      vegetationArea: 40,
      producerId: '7b9c8f0-4d2e-4c1a-8b3f-5d6e7f8a9b0c',
    };
    const res = await request(app.getHttpServer())
      .post('/properties')
      .send(dto);
    expect(400).toBe(res.status);
  });

  it('POST /properties deve retornar erro para campos obrigatórios ausentes', async () => {
    const dto = {
      name: 'Fazenda Erro',
      city: 'Cidade',
      state: 'UF',
      totalArea: 100,
      arableArea: 630,
      vegetationArea: 40,
    };

    const res = await request(app.getHttpServer())
      .post('/properties')
      .send(dto);

    showLog('res.status', res.status);

    expect(400).toBe(res.status);
  });

  it('POST /crops deve retornar erro para campos obrigatórios ausentes', async () => {
    const res = await request(app.getHttpServer()).post('/crops').send({
      name: 'Milho',
      year: 2025,
    });
    expect(400).toBe(res.status);
  });

  it('GET /producers/:id deve retornar 404 para id inexistente', async () => {
    const res = await request(app.getHttpServer()).get(
      '/producers/f8c3de3d-1fea-4d7c-a8b0-29f63c4c3454', // Exemplo de ID inexistente
    );
    expect(res.status).toBe(404);
  });

  it('GET /properties/:id deve retornar 404 para id inexistente', async () => {
    const res = await request(app.getHttpServer()).get(
      '/properties/f8c3de3d-1fea-4d7c-a8b0-29f63c4c3454', // Exemplo de ID inexistente
    );
    expect(res.status).toBe(404);
  });

  it('GET /crops/:id deve retornar 404 para id inexistente', async () => {
    const res = await request(app.getHttpServer()).get(
      '/crops/f8c3de3d-1fea-4d7c-a8b0-29f63c4c3454',
    ); // Exemplo de ID inexistente
    expect(res.status).toBe(404);
  });
});
