import request from 'supertest';
import server from '../../server';

describe('Post /api/products', () => {

  it('should display validation erros', async () => {
    const response = await request(server)
      .post('/api/products')
      .send({}); 
    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toHaveLength(5);
  })

  it('should validate that the price is greater that 0', async () => {
    const response = await request(server)
      .post('/api/products')
      .send({
        name: 'Monitor curvo',
        price: 0
      }); 
    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toHaveLength(1);
  })

  it('should create a new product', async () => {
    const response = await request(server)
      .post('/api/products')
      .send({
        name: 'Mouse testing',
        price: 100,
      }); 
    
    expect(response.status).toEqual(201);
    expect(response.body).toHaveProperty('data');

    expect(response.status).not.toEqual(500);
    expect(response.status).not.toEqual(404);
  });
})

describe('Get /api/products', () => {
  it("Get a Json response with products", async () => {
    const response = await request(server).get('/api/products');
    expect(response.status).toEqual(200);
    expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
    expect(response.body).toHaveProperty('data');
  })
});

describe('Get /api/products/:id', () => {
  it("Should return a 404 response for a non-existing product", async () => {
    const productId = 999999;
    const response = await request(server).get(`/api/products/${productId}`);
    expect(response.status).toEqual(404);
    // expect(response.body).toHaveProperty('errors');
    // expect(response.body.error).toEqual('Product not found');
  });

  it('Should check a valid Id in the URK', async() => {
    const response = await request(server).get('/api/products/not-valid-url');
    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty('errors');
  })

  it('get a JSON response for a single producto', async () => {
    const response = await request(server).get('/api/products/1');
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('data');
  });
})

describe('Put /api/products/:id', () => {
  it('Should display validations errors messages when updating a product', async () => {
    const response = await request(server)
      .put('/api/products/1')
      .send({}); 
    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toBeTruthy();
  });
});

describe('DELETE /api/products/:id', () => {
  it('Should check valid id', async () => {
    const response = await request(server).delete('/api/products/not-valid-url');
    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty('errors');
  });
  it('Should delete a product', async () => {
    const response = await request(server).delete('/api/products/1');
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('data');
  });
});