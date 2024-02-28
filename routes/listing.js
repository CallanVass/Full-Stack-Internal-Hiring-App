import { Router } from "express"
import { ListingModel } from '../db.js'

// Initialize new router instance
const router = Router()
// PATHING FOR ROUTES: http://localhost:8003/listings

// Get all listings
router.get('/', async (req, res) => {
  try {
    // Query DB for listings, populating applicants and creator within
    const listings = await ListingModel.find().populate('applicants').populate('creator')
    // If there are no listings, return an error
    if (!listings) {
        return res.status(404).send({error: 'No listings found'})
    }
    // If there are listings, send them
    res.status(200).send(listings)
    // Handle errors within try/catch
  } catch (error) {
    res.status(500).send(error)
  }
})

// Get a single listing by ID
router.get('/:id', async (req, res) => {
  try {
    // Query DB for a listing, populating applicants and creator within
    const listing = await ListingModel.findById(req.params.id).populate('applicants').populate('creator')
    // If it doesn't exist, return an error
    if (!listing) {
      return res.status(404).send({error: 'Listing not found'})
    }
    // If listing exists, send it
    res.status(200).send(listing)
    // Handle errors within try/catch
  } catch (error) {
    res.status(500).send(error)
  }
})

// Create new listing
router.post('/', async (req, res) => {
  try {
    // Create new listing in the DB using the request body
    const newListing = await (await ListingModel.create(req.body)).populate('creator')
    // Send new listing back to client
    res.status(201).send(newListing)
    // Handle errors within try/catch
  } catch (error) {
    res.status(400).send(error)
  }
})

// Update a listing by ID using PUT
router.put('/:id', async (req, res) => {
  try {
    // Creator not required as this is not amendable
    // Update the listing of the specified request id
    const updatedListing = (await (await ListingModel.findByIdAndUpdate(req.params.id, req.body, {new : true})).populate('applicants'))
    // If update was successful, send back updated listing
    if (updatedListing) {
      res.status(200).send(updatedListing)
    // Else handle the error of missing listing
    } else {
      res.status(404).send({error: 'Listing not found'})
    }
    // Handle errors within try/catch
  } catch (error) {
    res.status(400).send({error: error.message})
  }
})


// Delete a listing by ID
router.delete('/:id', async (req, res) => {
  try {
    // Creator not required as this is not amendable
    // Delete listing of the specified request id
    const deletedListing = await ListingModel.findByIdAndDelete(req.params.id)
    // If deletion is successful, send back successful status
    if (deletedListing) {
        // Changed to 200 so message can be received after deletion
        res.status(200).send({ message: "listing successfully deleted"})
    // Else handle error of missing listing
    } else {
        res.status(404).send({error: 'Listing not found'})
    }
    // Handle errors within try/catch
  } catch (error) {
    res.status(500).send({error: error.message})
  }
})


export default router