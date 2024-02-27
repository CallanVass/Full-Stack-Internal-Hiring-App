import mongoose from 'mongoose'
import dotenv from 'dotenv'

// Load .env variables
dotenv.config()

try {
    // Attempt connection to MongoDB using .env connection string
    const m = await mongoose.connect(process.env.DB_URI)
    // Log success and failure using a ternary operator
    console.log(m.connection.readyState === 1 ? 'MongoDB connected!' : 'MongoDB failed to connect')
}
// Error handling, logged to console
catch (err) {
    console.error(err)
}

// Function to close MongoDB connection
const closeConnection = () => {
    // Log closure
    console.log('Mongoose disconnecting ...')
    // Disconnect from DB
    mongoose.disconnect()
}

// Define usersSchema using Mongoose
const usersSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    department: { type: String , required: true },
    image: { type: String, required: false },
    admin: { type: Boolean, default:  false },
    aboutMe: { type: Object, required: false }, // Object with key-value pairs: headline, career_goals, tags etc
    applications: [
        {
            type: mongoose.ObjectId,
            ref: 'Listing'
        } // Only visible to user / admin
    ]
})

// Assign UserModel to usersSchema
const UserModel = mongoose.model('User', usersSchema)

// Define listingsSchema using Mongoose
const listingsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: Object, required: true }, // Includes bullet points and full text
    department: { type: String, required: true },
    location: { type: String, required: true },
    roleType: { type: String, required: true },
    roleDuration: { type: String, required: true },
    salary: { type: Number, required: true },
    datePosted: { type: Date, required: true },
    dateClosing: { type: Date, required: true },
    newListing: { type: Boolean, required: true, default: true},
    listingStatus: { type: String, required: true, default: 'Active'}, // Active, Inactive, Closed, Filled
    applicants: [
        {
            type: mongoose.ObjectId,
            ref: 'User'
        } // Only visible to creator / admin
    ],
    creator: {type: mongoose.ObjectId, ref: 'User'}

})

// Assign ListingModel to listingsSchema
const ListingModel = mongoose.model('Listing', listingsSchema)


// Export functions and variables
export { closeConnection, UserModel, ListingModel }