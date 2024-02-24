import { Router } from "express"
import bcrypt from 'bcrypt'
import { UserModel } from '../db.js'
import auth from '../auth.js'

const router = Router()
// PATHING FOR ROUTES: http://localhost:8003/users

// Get all users (AUTH REQUIRED)
router.get('/', auth, async (req, res) => {
  try {
    const users = await UserModel.find().populate('applications')
    res.status(200).send(users)
  } catch (error) {
    res.status(500).send(error)
  }
})

// Get a single user by ID (AUTH REQUIRED)
router.get('/:id', auth, async (req, res) => {
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


// Create a new user (AUTH REQUIRED)
router.post('/', auth, async (req, res) => {
  try {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(req.body.password, 8)
    const newUser = new UserModel({
      ...req.body,
      password: hashedPassword,
    })
    await newUser.save()
    res.status(201).send(newUser)
  } catch (error) {
    res.status(400).send(error)
  }
})


// Update a user by ID using PUT (AUTH REQUIRED)
router.put('/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['firstName', 'lastName', 'email', 'password', 'role', 'department', 'admin', 'aboutMe', 'applications']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' })
  }

  try {
    const user = await UserModel.findById(req.params.id)
    if (!user) {
      return res.status(404).send()
    }

    // If updating password, hash it before saving
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 8)
    }

    updates.forEach((update) => user[update] = req.body[update])
    await user.save()
    res.send(user)
  } catch (error) {
    res.status(400).send(error)
  }
})

// Delete a user by ID (AUTH REQUIRED)
router.delete('/:id', auth, async (req, res) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id)
    if (!user) {
      return res.status(404).send()
    }
    res.send(user)
  } catch (error) {
    res.status(500).send(error)
  }
})

export default router