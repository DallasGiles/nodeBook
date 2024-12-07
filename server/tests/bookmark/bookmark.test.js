const request = require('supertest');
const app = require('../../src/app');
const mongoose = require('mongoose');
const Bookmark = require('../../src/models/Bookmark');
const { connectDB, closeDB } = require('../../src/config/db');

beforeAll(async () => {
  process.env.NODE_ENV = 'test'; 
  await connectDB(); 
});

afterAll(async () => {
  await closeDB(); 
});


describe('Bookmark API', () => {
  let token;

  beforeAll(async () => {
    const res = await request(app).post('/api/auth/register').send({
      username: 'bookmarkUser',
      email: 'bookmarkUser@example.com',
      password: 'password123',
    });

    token = res.body.token;
  });

  afterAll(async () => {
    await Bookmark.deleteMany({});
    await mongoose.connection.close();
  });

  describe('POST /api/bookmarks', () => {
    it('should create a bookmark', async () => {
      const res = await request(app)
        .post('/api/bookmarks')
        .set('Authorization', `Bearer ${token}`)
        .send({
          url: 'https://example.com',
          title: 'Example',
          description: 'Test bookmark',
        });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('bookmark');
      expect(res.body.bookmark).toHaveProperty('url', 'https://example.com');
    });
  });

  describe('GET /api/bookmarks', () => {
    it('should fetch user bookmarks', async () => {
      const res = await request(app)
        .get('/api/bookmarks')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('bookmarks');
      expect(res.body.bookmarks.length).toBeGreaterThan(0);
    });
  });
});