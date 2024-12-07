const authMiddleware = require('../../src/middlewares/authMiddleware');
const jwt = require('jsonwebtoken');
const { connectDB, closeDB } = require('../../src/config/db');

beforeAll(async () => {
  process.env.NODE_ENV = 'test'; 
  await connectDB(); // Connect to testDB
});

afterAll(async () => {
  await closeDB(); 
});


describe('Auth Middleware', () => {
  it('should pass for valid token', () => {
    const req = {
      headers: {
        authorization: 'Bearer validToken',
      },
    };
    const res = {};
    const next = jest.fn();

    jest.spyOn(jwt, 'verify').mockReturnValue({ id: '123', role: 'user' });

    authMiddleware(req, res, next);

    expect(req.user).toEqual({ id: '123', role: 'user' });
    expect(next).toHaveBeenCalled();
  });

  it('should fail for missing token', () => {
    const req = { headers: {} };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Authorization token missing or invalid' });
  });
});