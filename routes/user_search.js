import { Router } from "express"
import {bcrypt} from "bcrypt"
import {UserModel} from '../db.js'

const router = Router()

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await UserModel.find({})
    res.status(200).send(users)
  } catch (error) {
    res.status(500).send(error)
  }
})


// Get a single user by ID
router.get('/users/:id', async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id)
    if (!user) {
      return res.status(404).send()
    }
    res.send(user)
  } catch (error) {
    res.status(500).send(error)
  }
})


export default router