// File for seeding profile data, login data, and
import { closeConnection, UserModel, ListingModel } from "./db.js"

const users = [
    {
        "firstName": "Adam",
        "lastName": "Administration",
        "email": "adam@email.com",
        "password": "password",
        "role": "Recruitment Manager",
        "department": "Human Resources",
        "admin": true,
    },
    {
        "firstName": "Betty",
        "lastName": "Business",
        "email": "betty@email.com",
        "password": "password",
        "role": "HR Specialist",
        "department": "Human Resources",
        "admin": false,

    },
    {
        "firstName": "Charlie",
        "lastName": "Candidate",
        "email": "charlie@email.com",
        "password": "password",
        "role": "Software Engineer",
        "department": "IT",
        "admin": false,

    },
    {
        "firstName": "David",
        "lastName": "Developer",
        "email": "david@email.com",
        "password": "password",
        "role": "Product Manager",
        "department": "Production",
        "admin": false,

    }
]

await UserModel.deleteMany()
console.log('Deleted users')
const db_users = await UserModel.insertMany(users)
console.log('Added users')

const listings = [
    {
        "title": "Web Developer",
        "description": {
            "points": ["Job point 1", "Job point 2", "Job point 3", "Job point 4"],
            "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias laudantium, aut distinctio impedit esse eos unde, quasi voluptates officiis rem ex iste nemo debitis soluta ut earum! Sed numquam doloremque quo magnam ullam? Rem quod vel repellendus fugit beatae quaerat."
        },
        "department": "IT",
        "location": "Hybrid",
        "salary": "100000",
        "roleType": "Full-time",
        "roleDuration": "Contract",
        "datePosted": "2024-02-10",
        "dateClosing": "2024-02-29",
        "applicants": db_users[2],
        "creator" :  db_users[0]
    },
    {
        "title": "Marketing Manager",
        "description": {
            "points": ["Job point 1", "Job point 2", "Job point 3", "Job point 4"],
            "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias laudantium, aut distinctio impedit esse eos unde, quasi voluptates officiis rem ex iste nemo debitis soluta ut earum! Sed numquam doloremque quo magnam ullam? Rem quod vel repellendus fugit beatae quaerat."
        },
        "department": "Marketing",
        "location": "Hybrid",
        "roleType": "Full-time",
        "roleDuration": "Permanent",
        "salary": "120000",
        "datePosted": "2024-02-10",
        "dateClosing": "2024-02-29",
        "applicants": db_users[3],
        "creator" : db_users[0]
    },
    {
        "title": "Data Analyst",
        "description": {
            "points": ["Job point 1", "Job point 2", "Job point 3", "Job point 4"],
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
        "applicants": "",
        "creator" : db_users[0]
    },
]

await ListingModel.deleteMany()
console.log('Deleted listings')
await ListingModel.insertMany(listings)
console.log('Added users')


closeConnection()