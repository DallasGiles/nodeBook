const app = require('../../src/app');
const request = require('supertest');
const { connectDB, closeDB } = require('../../src/config/db');

beforeAll(async () => {
  process.env.NODE_ENV = 'test'; // Ensure we're in test mode
  await connectDB(); 
});

afterAll(async () => {
  await closeDB(); 
});


describe('Federation API', () => {
  it('should return 404 for an invalid route', async () => {
    const res = await request(app).get('/api/federation/invalid');
    expect(res.statusCode).toBe(404); // Verify the 404 status
    expect(res.body).toHaveProperty('error', 'Route /api/federation/invalid not found');
  });
});