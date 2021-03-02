const server = require ('../index');
const supertest = require('supertest');
const request = supertest(server)

describe("Users",  ()=> {
  
  let superId;
  describe('POST', ()=>{
    
    it('create new user with all data', async ()=> {
      const body={
        firstName: 'testing',
        surname: 'TEST',
        email: 'test@gmail.com',
        encryptedPassword: '1234'
      }
      // Sends POST Request to /test endpoint
      const res = await request.post('/users').send(body);
      superId = res.body.id
      expect(res.status).toBe(201)
    })

    it('create new user without firstname in body', async()=>{
      const body={
        surname: 'TEST',
        email: 'test@gmail.com',
        encryptedPassword: '1234'
      }
      // Sends POST Request to /test endpoint
      const res = await request.post('/users').send(body);
      expect(res.status).toBe(400)
    })

    it('create new user without surname in body', async()=>{
      const body={
        firstName: 'testing',
        email: 'test@gmail.com',
        encryptedPassword: '1234'
      }
      // Sends POST Request to /test endpoint
      const res = await request.post('/users').send(body);
      expect(res.status).toBe(400)
    })

    it('create new user without email in body', async()=>{
      const body={
        firstName: 'testing',
        surname: 'TEST',
        encryptedPassword: '1234'
      }
      // Sends POST Request to /test endpoint
      const res = await request.post('/users').send(body);
      expect(res.status).toBe(400)
    })

    it('create new user without encryptedPassword in body', async()=>{
      const body={
        firstName: 'testing',
        surname: 'TEST',
        email: 'test@gmail.com',
      }
      // Sends POST Request to /test endpoint
      const res = await request.post('/users').send(body);
      expect(res.status).toBe(400)
    })

  })
  describe('GET', ()=>{

    it('Get all users', async ()=> {
      // Sends GET Request to /test endpoint
      const res = await request.get('/users')
      expect(res.status).toBe(200)
    })

    it('GET user by id', async()=>{
      // Sends GET Request to /test endpoint
      const res = await request.get('/users/'+ superId)
      expect(res.status).toBe(200)
    })

    it('GET user by id but this id is not register', async()=>{
      // Sends GET Request to /test endpoint
      const res = await request.get('/users/'+ 999999999)
      expect(res.status).toBe(404)
    })

  })

  describe('PUT', ()=>{

    it('put one user without id', async()=>{
      const res = await request.put('/users');
      expect(res.status).toBe(404)
    })

    it('put one user without body', async()=>{
      const res = await request.put('/users/'+ superId);
      expect(res.status).toBe(400)
    })

    it('put one user', async()=>{
      const body={
        firstName: 'testing put',
        surname: 'TEST put',
        email: 'test@gmail.com put',
      }
      const res = await request.put('/users/'+ superId).send(body);
      expect(res.status).toBe(200)
    })

    it('put one user but id not found', async()=>{
      const body={
        firstName: 'testing put',
        surname: 'TEST put',
        email: 'test@gmail.com put',
      }
      const res = await request.put('/users/23423423').send(body);
      expect(res.status).toBe(404)
    })

  })

  describe('DELETE', ()=>{

    it('delete one user without id', async()=>{
      const res = await request.delete('/users');
      expect(res.status).toBe(404)
    })

    it('delete one user non-existent', async()=>{
      const res = await request.delete('/users/23423423');
      expect(res.status).toBe(404)
    })

    it('delete one user', async()=>{
      const res = await request.delete('/users/'+ superId);
      expect(res.status).toBe(204)
    })

  })


});