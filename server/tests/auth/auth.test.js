const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../src/app');
const { connectDB, closeDB } = require('../../src/config/db');

beforeAll(async () => {
  process.env.NODE_ENV = 'test'; 
  await connectDB(); 
});

afterAll(async () => {
  await closeDB(); 
});


describe('Authentication API', () => {
  it('should register a new user', async () => {
    const res = await request(app).post('/api/auth/register').send({
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123',
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message', 'User registered successfully');
    expect(res.body).toHaveProperty('token');
  });

  it('should fail when registering with an existing email', async () => {
    await request(app).post('/api/auth/register').send({
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123',
    });

    const res = await request(app).post('/api/auth/register').send({
      username: 'testuser2',
      email: 'testuser@example.com',
      password: 'password123',
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error', 'Email or username is already in use');
  });
});
