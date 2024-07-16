import server from "../server";
import  request  from "supertest";


describe('Get /api', () => {
  it('should send back a json response', async () => {
    const response = await request(server).get('/api');

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.msg).toBe('API is running');

    expect(response.status).not.toBe(404);
    expect(response.body.msg).not.toBe('api is not running');

    console.log(response.body.msg);
  });
});