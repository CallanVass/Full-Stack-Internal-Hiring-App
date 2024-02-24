import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

try {
    const m = await mongoose.connect(process.env.DB_URI)
    console.log(m.connection.readyState === 1 ? 'MongoDB connected!' : 'MongoDB failed to connect')
}
catch (err) {
    console.error(err)
}

const closeConnection = () => {
    console.log('Mongoose disconnecting ...')
    mongoose.disconnect()
}

const usersSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    department: { type: String , required: true },
    admin: { type: Boolean, default:  false },
    aboutMe: { type: Object, required: false }, // Object with key-value pairs: headline, career_goals, tags etc
    applications: {type: mongoose.ObjectId, ref: 'Listing'}
})

const UserModel = mongoose.model('User', usersSchema)


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
    applicants: {type: [mongoose.ObjectId], ref: 'User'},
    creator: {type: mongoose.ObjectId, ref: 'User'}

})

const ListingModel = mongoose.model('Listing', listingsSchema)


export { closeConnection, UserModel, ListingModel }