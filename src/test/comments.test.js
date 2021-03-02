const server = require('../index');
const supertest = require('supertest');
const { iteratee } = require('lodash');
const { expectCt } = require('helmet');
const request = supertest(server);

describe('Comments', ()=>{

  let superId;
  let userId
  describe('POST', ()=>{
    it('create new comment with all data', async()=>{
      // Sends POST to user
      const userBody={
        firstName: 'testing',
        surname: 'TEST',
        email: 'test@gmail.com',
        encryptedPassword: '1234'
      }
      const user = await request.post('/users').send(userBody);
      userId = user.body.id
      // Sends POST Request to comment
      const commentBody={
        title:'test comment',
        comment:'asdkjflaksjflkjsfd',
        UserId:userId
      }
      const res = await request.post('/comments').send(commentBody)
      superId = res.body.id
      expect(res.status).toBe(201)
    })

    it('create new comment without title', async()=>{

      const body={
        comment:'asdkjflaksjflkjsfd',
        UserId:userId
      }
      const res = await request.post('/comments').send(body)
      expect(res.status).toBe(400)
    })

    it('create new comment without comment', async()=>{

      const body={
        title:'test comment',
        UserId:userId
      }
      const res = await request.post('/comments').send(body)
      expect(res.status).toBe(400)
    })

    it('create new comment without userId', async()=>{

      const body={
        title:'test comment',
        comment:'asdkjflaksjflkjsfd',
      }
      const res = await request.post('/comments').send(body)
      expect(res.status).toBe(400)
    })

    it('create new comment by UserId is not register', async()=>{

      const body={
        title:'test comment',
        comment:'asdkjflaksjflkjsfd',
        UserId:7982374237
      }
      const res = await request.post('/comments').send(body)
      expect(res.status).toBe(400)
    })

  })

  describe('GET', ()=>{

    it('Get all comments', async()=>{
      const res = await request.get('/comments')
      expect(res.status).toBe(200)
    })

    it('GET comment by id', async()=>{
      // Sends GET Request to /test endpoint
      const res = await request.get('/comments/'+ superId)
      expect(res.status).toBe(200)
    })

    it('GET comment by id but this id is not register', async()=>{
      // Sends GET Request to /test endpoint
      const res = await request.get('/users/'+ 999999999)
      expect(res.status).toBe(404)
    })

  })

  describe('PUT', ()=>{

    it('put one comment without id', async()=>{
      const res = await request.put('/comments');
      expect(res.status).toBe(404)
    })

    it('put one comment without body', async()=>{
      const res = await request.put('/comments/'+superId)
      expect(res.status).toBe(400)
    })


    it('put one comment', async()=>{
      const body={
        title:'test comment put',
        comment:'test put',
      }
      const res = await request.put('/comments/'+ superId).send(body);
      expect(res.status).toBe(200)
    })

    it('put one comment but id not found', async()=>{
      const body={
        title:'test comment put',
        comment:'test put',
      }
      const res = await request.put('/comments/23423423').send(body);
      expect(res.status).toBe(404)
    })

  })

  describe('DELETE', ()=>{

    it('delete one comment without id', async()=>{
      const res = await request.delete('/comments');
      expect(res.status).toBe(404)
    })

    it('delete one comment non-existent', async()=>{
      const res = await request.delete('/comments/23423423');
      expect(res.status).toBe(404)
    })

    it('delete one comment', async()=>{
      const res = await request.delete('/comments/'+ superId);
      expect(res.status).toBe(204)
    })

  })
})