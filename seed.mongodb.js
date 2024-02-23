/* global use, db */
// MongoDB Playground
// Select the database to use.
use('database')

db.users.drop()
db.listings.drop()

db.createCollection('users')
db.createCollection('listings')
