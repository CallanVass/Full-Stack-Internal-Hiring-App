import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserModel } from '../db.js'

const router = express.Router()

router.post('/', async (req, res) => {
  // Extract email and password from request body
  const { email, password } = req.body

  try {
    // Find the user by email
    const user = await UserModel.findOne({ email })

    if (!user) {
      return res.status(404).send('User not found')
    }

    // Compare submitted password with the user's hashed password
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(401).send('Invalid credentials')
    }

    // Generate a JWT
    const token = jwt.sign(
      { _id: user._id.toString() },
      process.env.SECRET_KEY, 
      { expiresIn: '1h' } // Token expiration time
    )

    // Send the JWT to the client
    res.send({ token })
  } catch (error) {
    res.status(500).send('Server error')
  }
})

// PLEASE NOTE: In order to use this route, you must first hash a password from the seeded users.
// This routes compares a hashed password (Updating a user will hash the password)

export default router