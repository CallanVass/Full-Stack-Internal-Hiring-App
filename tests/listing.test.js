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

describe('POST /listings route', () => {
    let newListingData, response

    beforeAll(async () => {
        // Mock data for creating a new listing
        newListingData = {
            title: "Test Listing",
            description: {
                bulletPoints: ["Point 1", "Point 2"],
                fullText: "Full description of the listing."
            },
            department: "Engineering",
            location: "Remote",
            roleType: "Full-Time",
            roleDuration: "Permanent",
            salary: 50000,
            datePosted: new Date(),
            dateClosing: new Date(new Date().setDate(new Date().getDate() + 30)), // Closing date 30 days from now
            newListing: true,
            listingStatus: "Active",
            // Note: 'creator' and 'applicants' fields are omitted for simplicity
        }

        // Attempt to create a new listing
        response = await request(app).post('/listings').send(newListingData)
    })

    describe("Status Code", () => {
        test('Responds with 201 status code for successful creation', () => {
            expect(response.status).toBe(201)
        })
    })

    describe("Content Type", () => {
        test("should have a content type of application/json", () => {
            expect(response.header['content-type']).toContain('application/json')
        })
    })

    describe("Response Body", () => {
        test("should have all required fields", () => {
            const expectedProperties = ['title', 'description', 'department', 'location', 'roleType', 
                                        'roleDuration', 'salary', 'datePosted', 'dateClosing', 'newListing', 'listingStatus']
            expectedProperties.forEach(property => {
                expect(response.body).toHaveProperty(property)
            })
            expect(Array.isArray(response.body.applicants)).toBe(true)
        })

        test("matches the mock data for all provided fields", () => {
            expect(response.body.title).toEqual(newListingData.title)
            expect(response.body.description).toEqual(expect.objectContaining(newListingData.description))
            expect(response.body.department).toEqual(newListingData.department)
            expect(response.body.location).toEqual(newListingData.location)
            expect(response.body.roleType).toEqual(newListingData.roleType)
            expect(response.body.roleDuration).toEqual(newListingData.roleDuration)
            expect(response.body.salary).toEqual(newListingData.salary)
            expect(new Date(response.body.datePosted)).toEqual(expect.any(Date))
            expect(new Date(response.body.dateClosing)).toEqual(expect.any(Date))
            expect(response.body.newListing).toEqual(newListingData.newListing)
            expect(response.body.listingStatus).toEqual(newListingData.listingStatus)
        })
    })

    afterAll(async () => {
        // Cleanup: delete the created listing
        if (response.body._id) {
            await request(app).delete(`/listings/${response.body._id}`)
        }
    })
})

// Update a Listing


// Delete a Listing
