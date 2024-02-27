import app from '../app.js'
import request from 'supertest'

// GET All Listings
describe("GET /listings route", () => {
    let response
  
    // Fetch the listings before running the tests
    beforeAll(async () => {
      response = await request(app).get('/listings')
    })
  
    describe("Status Code", () => {
      test("should return a 200 status for a successful request", () => {
        expect(response.status).toBe(200)
      })
    })
  
    describe("Content Type", () => {
      test("should have a content type of application/json", () => {
        expect(response.header['content-type']).toContain('application/json')
      })
    })
  
    describe("Response Body", () => {
      test("should return an array of listings", () => {
        expect(Array.isArray(response.body)).toBe(true)
      })
  
      test("Array isn't empty", () => {
        expect(response.body.length).toBeGreaterThan(0)
      })
  
      test("each listing should have essential properties", () => {
        const properties = ['title', 'description', 'department', 'location', 'roleType', 
        'roleDuration', 'salary', 'datePosted', 'dateClosing', 'newListing', 'listingStatus', 'applicants']
        properties.forEach(property => {
            expect(response.body[0]).toHaveProperty(property)
        })
      })
    })
})

// GET One Listing

describe("GET /listings/:id route", () => {
    let response
    let userId = "65de6f9ee3ea525825c2c28e" // CHANGE FOR CURRENT LISTING ID

    beforeAll(async () => {
        response = await request(app).get(`/listings/${userId}`)
    })

    describe("Status Code", () => {
        test("should return a 200 status for a successful request", () => {
            expect(response.status).toBe(200)
        })
    })

    describe("Content Type", () => {
        test("should have a content type of application/json", () => {
            expect(response.header['content-type']).toContain('application/json')
        })
    })

    describe("Response Body", () => {
        test("should return a listing object", () => {
            expect(response.body).toBeInstanceOf(Object)
        })

        test("listing should have essential properties", () => {
            const properties = ['title', 'description', 'department', 'location', 'roleType', 
            'roleDuration', 'salary', 'datePosted', 'dateClosing', 'newListing', 'listingStatus', 'applicants']
            properties.forEach(property => {
                expect(response.body).toHaveProperty(property)
            })
        })
    })
})

// Create a new Listing


// Update a Listing


// Delete a Listing
