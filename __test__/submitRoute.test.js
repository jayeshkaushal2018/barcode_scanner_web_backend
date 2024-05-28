const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const submitRoute = require('../routes/submitRoute');
const errorHandler = require('../middlewares/errorHandler');

// Mock database module
jest.mock('../config/db', () => {
  return {
    query: jest.fn(),
  };
});

const db = require('../config/db');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(helmet());

// Routes
app.use('/api', submitRoute);

// Error handling middleware
app.use(errorHandler);

describe('POST /api/submit-form', () => {
  it('should successfully submit the form', async () => {
    db.query.mockResolvedValue([{ insertId: 1 }]);

    const response = await request(app)
      .post('/api/submit-form')
      .send({
        scannedResult: 'SampleQRCode',
        employmentId: '12345',
        quantity: 10,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Data received successfully');
    expect(response.body).toHaveProperty('insertId', 1);
  });

  it('should return validation errors for missing fields', async () => {
    const response = await request(app)
      .post('/api/submit-form')
      .send({
        scannedResult: '',
        employmentId: '',
        quantity: '',
      });

    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ msg: 'Scanned result is required' }),
        expect.objectContaining({ msg: 'Employment ID is required' }),
        expect.objectContaining({ msg: 'Quantity is required' }),
      ])
    );
  });

  it('should return validation error for non-numeric quantity', async () => {
    const response = await request(app)
      .post('/api/submit-form')
      .send({
        scannedResult: 'SampleQRCode',
        employmentId: '12345',
        quantity: 'non-numeric',
      });

    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ msg: 'Quantity must be a number' }),
      ])
    );
  });

  it('should handle database errors gracefully', async () => {
    db.query.mockRejectedValue(new Error('Database error'));

    const response = await request(app)
      .post('/api/submit-form')
      .send({
        scannedResult: 'SampleQRCode',
        employmentId: '12345',
        quantity: 10,
      });

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('status', 'error');
    expect(response.body).toHaveProperty('message', 'Database error');
  });
});
