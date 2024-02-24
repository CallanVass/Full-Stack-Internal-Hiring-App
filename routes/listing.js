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

// Create new listing
router.post('/', async (req, res) => {
  try {
    // Applicants not required for a new job listing
    const newListing = await (await ListingModel.create(req.body)).populate('creator')
    res.status(201).send(newListing)
  } catch (error) {
    res.status(400).send(error)
  }
})

// Update a listing by ID using PUT
router.put('/:id', async (req, res) => {
  try {
    // Creator not required as this is not amendable
    const updatedListing = (await (await ListingModel.findByIdAndUpdate(req.params.id, req.body, {new : true})).populate('applicants'))
    if (updatedListing) {
      res.status(200).send(updatedListing)
    } else {
      res.status(404).send({error: 'Listing not found'})
    }
  } catch (error) {
    res.status(400).send({error: error.message})
  }
})


// Delete a listing by ID
router.delete('/:id', async (req, res) => {
  try {
    // Creator not required as this is not amendable
    const deletedListing = await ListingModel.findByIdAndDelete(req.params.id)
    if (deletedListing) {
      res.sendStatus(204)
    } else {
      res.status(404).send({error: 'Listing not found'})
    }
  } catch (error) {
    res.status(500).send({error: error.message})
  }
})


export default router