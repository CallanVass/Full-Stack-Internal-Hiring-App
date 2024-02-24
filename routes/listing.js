import { Router } from "express"
import bcrypt from 'bcrypt'
import { ListingModel } from '../db.js'

const router = Router()
// PATHING FOR ROUTES: http://localhost:8003/listings

// Get all listings
router.get('/', async (req, res) => {
  try {
    const listings = await ListingModel.find().populate('applicants').populate('creator')
    if (!listings) {
        return res.status(404).send({error: 'No listings found'})
    }
    res.status(200).send(listings)
  } catch (error) {
    res.status(500).send(error)
  }
})

// Get a single listing by ID
router.get('/:id', async (req, res) => {
  try {
    const listing = await ListingModel.findById(req.params.id).populate('applicants').populate('creator')
    if (!listing) {
      return res.status(404).send({error: 'Listing not found'})
    }
    res.send(listing)
  } catch (error) {
    res.status(500).send(error)
  }
})




export default router