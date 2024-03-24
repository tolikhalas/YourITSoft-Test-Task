import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

import { TodoController } from 'src/todo/todo.controller';
import { TodoState } from 'src/todo/entities/todoState.enum';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(TodoController)
      .useValue(TodoController)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('/todo (GET)', () => {
    it('should return 200 response', () => {
      return request(app.getHttpServer()).get('/todo').expect(200);
    });
  });

  describe('/todo (POST)', () => {
    it('should return 201 response on valid request', async () => {
      const newTodoDto = {
        task: 'Test task',
        state: 'await',
      };

      const response = await request(app.getHttpServer())
        .post('/todo')
        .send(newTodoDto)
        .expect(201);

      expect(response.body.id).toBeDefined();
      expect(response.body.task).toBe(newTodoDto.task);
      expect(response.body.state).toBe(newTodoDto.state);
    });

    it('should return 400 response on invalid request', async () => {
      const newTodoDto = {
        task: 200,
      };

      return request(app.getHttpServer())
        .post('/todo')
        .send(newTodoDto)
        .expect(400);
    });
  });

  describe('/todo/:id (GET)', () => {
    it('should return 200 response on valid id', async () => {
      const response = await request(app.getHttpServer()).get('/todo/1');
      expect(response.statusCode).toBe(200);

      expect(response.body.id).toBeDefined();
      expect(response.body.task).toBeDefined();
      expect(response.body.state).toBeDefined();
    });

    it('should return 400 response on invalid id', async () => {
      const response = await request(app.getHttpServer()).get('/todo/abc');
      expect(response.statusCode).toBe(400);

      expect(response.body.message).toBe('Todo ID URL must be a number');
    });

    it('should return 404 response on inexisting todo', async () => {
      const response = await request(app.getHttpServer()).get('/todo/999');
      expect(response.statusCode).toBe(404);

      expect(response.body.message).toBe('Todo with ID 999 not found');
    });
  });

  describe('/todo/:id (PUT)', () => {
    const todoPut = {
      task: 'Make some exercises',
      state: TodoState.InProgress,
    };

    it('should return 200 response on valid id', async () => {
      const response = await request(app.getHttpServer())
        .put('/todo/1')
        .send(todoPut);
      expect(response.statusCode).toBe(200);

      expect(response.body.id).toBeDefined();
      expect(response.body.task).toBeDefined();
      expect(response.body.state).toBeDefined();
    });

    it('should return 400 response on invalid id', async () => {
      const response = await request(app.getHttpServer()).put('/todo/abc');
      expect(response.statusCode).toBe(400);

      expect(response.body.message).toBe('Todo ID URL must be a number');
    });

    it('should return 404 response on inexisting todo', async () => {
      const response = await request(app.getHttpServer()).put('/todo/999');
      expect(response.statusCode).toBe(404);

      expect(response.body.message).toBe('Todo with ID 999 not found');
    });
  });

  describe('/todo/:id (DELETE)', () => {
    it('should return 200 response on valid id', async () => {
      const response = await request(app.getHttpServer()).delete('/todo/1');
      expect(response.statusCode).toBe(200);
    });

    it('should return 400 response on invalid id', async () => {
      const response = await request(app.getHttpServer()).delete('/todo/abc');
      expect(response.statusCode).toBe(400);

      expect(response.body.message).toBe('Todo ID URL must be a number');
    });

    it('should return 404 response on inexisting todo', async () => {
      const response = await request(app.getHttpServer()).delete('/todo/999');
      expect(response.statusCode).toBe(404);

      expect(response.body.message).toBe('Todo with ID 999 not found');
    });
  });
});
