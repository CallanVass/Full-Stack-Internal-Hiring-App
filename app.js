import express from 'express'
import cors from 'cors'
import { UserModel, ListingModel } from "./db.js"

// Defining app instance
const app = express()

// Middleware

// Open CORS for development (CHANGE BEFORE DEPLOYMENT)
app.use(cors())

// Parse JSON requests for req.body
app.use(express.json())

app.get('/', (req, res) => res.send({info: "Talent Forge API"}))
app.get('/users', async (req, res) => res.send(await UserModel.find()))
app.get('/listings', async (req, res) => res.send(await ListingModel.find()))


// Listen for connections on specified port
// app.listen(8000, () => {
//     console.log("Server is running on port 8000")
// })

export default app