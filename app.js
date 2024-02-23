import express from 'express'
import cors from 'cors'
import userRoutes from './routes/user_search.js'
import { UserModel, ListingModel } from "./db.js"

// Defining app instance
const app = express()

// Middleware

// Open CORS for development (CHANGE BEFORE DEPLOYMENT)
app.use(cors())

// Parse JSON requests for req.body
app.use(express.json())

// Middleware for user-search routes
app.use('/users', userRoutes)

app.get('/', (req, res) => res.send({info: "Talent Forge API"}))
app.get('/listings', async (req, res) => res.send(await ListingModel.find()))

export default app