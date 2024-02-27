import app from '../app.js'
import request from 'supertest'

describe("App Test", () => {
    test('GET /listings', async () => {
      const res = await request(app).get('/')
      // console.log(res.header)
      expect(res.status).toBe(200)
      expect(res.header['content-type']).toContain('json')
      expect(res.body.info).toBeDefined()
    })
})