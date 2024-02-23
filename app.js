import express from 'express'
import cors from 'cors'

// Defining app instance
const app = express()

// Middleware

// Open CORS for development (CHANGE BEFORE DEPLOYMENT)
app.use(cors())

// Parse JSON requests for req.body
app.use(express.json())

// Listen for connections on specified port
app.listen(8000, () => {
    console.log("Server is running on port 8000")
})

export default app