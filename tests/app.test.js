const request = require('supertest')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const app  = require('../app')
const server = app.listen(8080, () => console.log('Testing on PORT 8080'))
const User = require('../models/user')
let mongoServer;


beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri())
  })
 
afterAll(async ()=>{
    await mongoose.connection.close() // programmatic ctrl+c
    mongoServer.stop() //getting rid of our MongoDB instance itself
    server.close()
}) 


describe('Test the user Endpoints', () => {

    test('It should create a new user', async ()=>{
        const response = await request(app) // supertest
        .post('/users')
        .send({name:'Bao', email:'BaoisBody@gmail.com', password:'haha'})
        expect(response.body.user.email).toEqual('BaoisBody@gmail.com')
        expect(response.body.user.name).toBe('Bao')
        expect(response.body).toHaveProperty('token')
    })

    test('It should login a user', async () => {
        const user = new User({ name: 'John Doe', email: 'john.doe@example.com', password: 'password123' })
        await user.save()
    
        const response = await request(app)
          .post('/users/login')
          .send({ email: 'john.doe@example.com', password: 'password123' })
        
        expect(response.statusCode).toBe(200)
        expect(response.body.user.name).toEqual('John Doe')
        expect(response.body.user.email).toEqual('john.doe@example.com')
        expect(response.body).toHaveProperty('token')
      })

      test('It should return a list of users', async ()=>{
        const response = await request(app)
          .get('/users')
        
        console.log("!!!!!!!!!!!!!!!!")
        console.log(response.body)
        
        expect(Array.isArray(response.body.users)).toBe(true) //expecting array because even an empty array will still be an array
        expect(response.statusCode).toBe(200)

      })
    
    
      test('It should log out a user',async ()=>{
        const response = await request(app)
        .post('/users/logout')
          .send({ email: 'john.doe@example.com' })

        //expect(response.body.email).toBe('john.doe@example.com')
        // expect(response.body.token).toBe(null)
        expect(response.body.message).toEqual('Logout Successful')
      })
    
    //make user 
    //save user
    //generat token 
      test('It should update a user', async ()=>{
        const user = new User({
          name:'Bao',
          email:"baoemail@email.com",
          password:'123',
          })
        await user.save()
        const token = await user.generateAuthToken()

        const response = await request(app)
        .put(`/users/${user._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'TJ', email: 't@j.com', password: 'newPassword123' })
        
      const foundUser = await User.findOne({ _id: user._id })

        // expect(response.body.user.email).toBe('baoemail@email.com') COMMENT OUT
        expect(response.statusCode).toBe(200)
        expect(response.body.message).toEqual(`updated user info`)
      })
    

      test('It should delete the user', async ()=>{
        const user = new User({ name: 'John Doe', email: 'john.doe@example.com', password: 'password123' })
        await user.save() 
        const token = await user.generateAuthToken()

        const response = await request(app)
          .delete(`/users/${user.id}`)
          .set('Authorization', `Bearer ${token}`)
        
        expect(response.body.message).toBe('User Deleted')
      })
    
  })

