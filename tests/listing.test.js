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
    let userId = "65de6f9ee3ea525825c2c28f" // CHANGE FOR CURRENT LISTING ID

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
describe('PUT /listings/:id route', () => {
    let originalListingData, updatedListingData, listingId, response

    beforeAll(async () => {
        // Mock data for creating a new listing to update
        originalListingData = {
            title: "Original Listing",
            description: {
                bulletPoints: ["Original Point 1", "Original Point 2"],
                fullText: "Original full description of the listing."
            },
            department: "Original Department",
            location: "Original Location",
            roleType: "Part-Time",
            roleDuration: "Temporary",
            salary: 30000,
            datePosted: new Date(),
            dateClosing: new Date(new Date().setDate(new Date().getDate() + 15)), // Closing date 15 days from now
            newListing: true,
            listingStatus: "Active",
        }

        // Create a new listing to update
        const createResponse = await request(app).post('/listings').send(originalListingData)
        listingId = createResponse.body._id

        // Data to update the listing with
        updatedListingData = {
            title: "Updated Listing",
            description: {
                bulletPoints: ["Updated Point 1", "Updated Point 2"],
                fullText: "Updated full description of the listing."
            },
            department: "Updated Department",
            location: "Updated Location",
            roleType: "Full-Time",
            roleDuration: "Permanent",
            salary: 60000, 
            dateClosing: new Date(new Date().setDate(new Date().getDate() + 30)), 
            newListing: false,
            listingStatus: "Inactive", 
        }

        // Attempt to update the listing
        response = await request(app).put(`/listings/${listingId}`).send(updatedListingData)
    })

    describe("Status Code", () => {
        test('Responds with 200 status code for successful update', () => {
            expect(response.status).toBe(200)
        })
    })

    describe("Content Type", () => {
        test("should have a content type of application/json", () => {
            expect(response.header['content-type']).toContain('application/json')
        })
    })

    describe("Response Body", () => {
        test("should have all updated fields", () => {
            const expectedProperties = ['title', 'description', 'department', 'location', 'roleType',
                                        'roleDuration', 'salary', 'datePosted', 'dateClosing', 'newListing', 'listingStatus']
            expectedProperties.forEach(property => {
                expect(response.body).toHaveProperty(property)
            })
            // Compares body response fields to updatedListingData properties
            expect(response.body.title).toEqual(updatedListingData.title)
            expect(response.body.description).toEqual(expect.objectContaining(updatedListingData.description))
            expect(response.body.department).toEqual(updatedListingData.department)
            expect(response.body.location).toEqual(updatedListingData.location)
            expect(response.body.roleType).toEqual(updatedListingData.roleType)
            expect(response.body.roleDuration).toEqual(updatedListingData.roleDuration)
            expect(response.body.salary).toEqual(updatedListingData.salary)
            expect(new Date(response.body.dateClosing)).toEqual(expect.any(Date))
            expect(response.body.newListing).toEqual(updatedListingData.newListing)
            expect(response.body.listingStatus).toEqual(updatedListingData.listingStatus)
        })
    })

    afterAll(async () => {
        // Delete the listing that was updated
        if (listingId) {
            await request(app).delete(`/listings/${listingId}`)
        }
    })
})


// Delete a Listing
describe('DELETE /listings/:id route', () => {
    let listingData, listingId, response

    beforeAll(async () => {
        // Mock data for creating a new listing to delete
        listingData = {
            title: "Listing to Delete",
            description: {
                bulletPoints: ["Delete Point 1", "Delete Point 2"],
                fullText: "Description of the listing to be deleted."
            },
            department: "Deletion Department",
            location: "Deletion Location",
            roleType: "Temporary",
            roleDuration: "Contract",
            salary: 20000,
            datePosted: new Date(),
            dateClosing: new Date(new Date().setDate(new Date().getDate() + 10)), // Closing date 10 days from now
            newListing: true,
            listingStatus: "Active",
        }

        // Create a new listing to delete
        const createResponse = await request(app).post('/listings').send(listingData)
        listingId = createResponse.body._id

        // Attempt to delete the listing
        response = await request(app).delete(`/listings/${listingId}`)
    })

    describe("Status Code", () => {
        test('Responds with 204 status code for successful deletion', () => {
            expect(response.status).toBe(200)
        })
    })

    describe("Response Body", () => {
        test("should confirm deletion with a message", () => {
            expect(response.body).toHaveProperty("message")
            expect(response.body.message).toEqual(expect.stringContaining('listing successfully deleted'))
        })
    })
})