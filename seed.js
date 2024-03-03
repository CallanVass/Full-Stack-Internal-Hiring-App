// File for seeding profile data, login data, and
import bcrypt from 'bcrypt'
import { closeConnection, UserModel, ListingModel } from "./db.js"

// Array of users for data seeding
const users = [
    {
        "firstName": "Adam",
        "lastName": "Andrews",
        "email": "adam@email.com",
        "password": await bcrypt.hash("fishing", 8),
        "role": "Recruitment Manager",
        "department": "Human Resources",
        "admin": true,
        "aboutMe": {text: "I am a manager of the recruitment team", careerDevelopment: "I am keen to experience all areas of Human Rescources", tags: ["Happy where I am!","Might be willing to move!"]},
    },
    {
        "firstName": "Betty",
        "lastName": "Bailey",
        "email": "betty@email.com",
        "password": await bcrypt.hash("castle", 8),
        "role": "HR Specialist",
        "department": "Human Resources",
        "admin": false,
        "aboutMe": {text: "I am a HR Specialist, looking after onboarding and training", careerDevelopment: "I aspire to be Learning and Development manager", tags: ["Looking for a new job!"]},

    },
    {
        "firstName": "Charlie",
        "lastName": "Castleton",
        "email": "charlie@email.com",
        "password": await bcrypt.hash("empire", 8),
        "role": "Software Engineer",
        "department": "IT",
        "admin": false,
        "aboutMe": {text: "I am a Software Engineer, having been recently promoted from Junior Software Engineer", careerDevelopment: "My long term plan is to be Head of IT", tags: ["Happy where I am!","Might be willing to move!"]},

    },
    {
        "firstName": "David",
        "lastName": "Denley",
        "email": "david@email.com",
        "password": await bcrypt.hash("cavalier", 8),
        "role": "Product Manager",
        "department": "Production",
        "admin": false,
        "aboutMe": {text: "I am a Product Manager and I manage a team of Product Developers", careerDevelopment: "Having gained extensive experience in the overseas market, I am keen to develop my skills within the local Production team", tags: ["Happy where I am!"]},

    },
    {
        "firstName": "Adam",
        "lastName": "Hunter",
        "email": "adamh@email.com",
        "password": await bcrypt.hash("butterfly", 8),
        "role": "Developer",
        "department": "IT",
        "admin": false,
        "aboutMe": {text: "I am a developer", careerDevelopment: "I want to be a senior developer", tags: ["Looking for a new job!","Happy where I am!","Might be willing to move!","Unsure how I feel about it!"]},
    }

]

// Delete all documents in collection related to UserModel
await UserModel.deleteMany()
console.log('Deleted users')

// Insert user documents into collection using previously defined array (users)
const db_users = await UserModel.insertMany(users)
console.log('Added users')

// Array of listings for data seeding
const listings = [
    {
        "title": "Web Developer",
        "description": {
            "points": ["Job point 1", "Job point 2", "Job point 3"],
            "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias laudantium, aut distinctio impedit esse eos unde, quasi voluptates officiis rem ex iste nemo debitis soluta ut earum! Sed numquam doloremque quo magnam ullam? Rem quod vel repellendus fugit beatae quaerat."
        },
        "department": "IT",
        "location": "Hybrid",
        "salary": "100000",
        "roleType": "Full-time",
        "roleDuration": "Contract",
        "datePosted": "2024-02-10",
        "dateClosing": "2024-02-29",
        "applicants": [db_users[2]],
        "creator" :  db_users[0]
    },
    {
        "title": "Marketing Manager",
        "description": {
            "points": ["Job point 1", "Job point 2", "Job point 3"],
            "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias laudantium, aut distinctio impedit esse eos unde, quasi voluptates officiis rem ex iste nemo debitis soluta ut earum! Sed numquam doloremque quo magnam ullam? Rem quod vel repellendus fugit beatae quaerat."
        },
        "department": "Marketing",
        "location": "Hybrid",
        "roleType": "Full-time",
        "roleDuration": "Permanent",
        "salary": "120000",
        "datePosted": "2024-02-10",
        "dateClosing": "2024-02-29",
        "applicants": [db_users[3], db_users[2]],
        "creator" : db_users[0]
    },
    {
        "title": "Data Analyst",
        "description": {
            "points": ["Job point 1", "Job point 2", "Job point 3"],
            "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias laudantium, aut distinctio impedit esse eos unde, quasi voluptates officiis rem ex iste nemo debitis soluta ut earum! Sed numquam doloremque quo magnam ullam? Rem quod vel repellendus fugit beatae quaerat."
        },
        "department": "Strategy",
        "location": "On Site",
        "roleType": "Full-time",
        "roleDuration": "Parental Leave",
        "salary": "90000",
        "datePosted": "2024-01-05",
        "dateClosing": "2024-01-20",
        "newListing": false,
        "applicants": [db_users[3]],
        "creator" : db_users[0]
    },
    {
        "title": "Administrator",
        "description": {
            "points": ["Great opportunity to join the data team", "Develop new processes", "Collaborate with internal and external teams"],
            "text": "The successful candidate will provide administrative support, greet and direct visitors and answer and respond to calls and emails. Qualified candidates will have impeccable verbal and written communication skills, a strong ability to multitask and a friendly demeanour."
        },
        "department": "Data",
        "location": "On Site",
        "salary": "70000",
        "roleType": "Full-time",
        "roleDuration": "Permanent",
        "datePosted": "2024-02-24",
        "dateClosing": "2024-03-04",
        "creator": db_users[0]
    }
]
// Delete all documents in collection related to ListingModel
await ListingModel.deleteMany()
console.log('Deleted listings')

// Insert listing documents into collection using previously defined array (listings)
await ListingModel.insertMany(listings)
console.log('Added users')

// Log both listings and users to console
console.log(listings)
console.log(db_users)

// Manually close connection to database when finished seeding
closeConnection()