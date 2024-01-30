const supertest = require('supertest');
const router = require('../routes/routes');

const request = supertest(router);
describe('Test the /maketable path', () => {
  it('POST /maketable sets up the table in containerized DynamoDB', async () => {
    const response = await request.post('/maketable');

    expect(response.status).toBe(200);
    
    // Here you can add a piece of code to interact with the containerized DynamoDB
    // and check if the table was correctly created.
  });
});

describe('Test the /observations path', () => {
  it('GET /observations returns all observations', async () => {
     const response = await request.get('/observations');
     expect(response.status).toBe(200);
     expect(Array.isArray(response.body)).toBe(true);
  });
});
