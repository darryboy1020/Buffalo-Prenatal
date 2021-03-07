// /backend/data.js
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// this will be our data base's data structure
const DataSchema = new Schema(
  {
    name: String,
    email: String,
    question1: String,
    question2: String,
    question3: String,
    question4: String,
    question5: String,
    question6: String,
    question7: String,
    question8: String,
    question9: String,
    question10: String,
    question11: String,
  },
  { timestamps: true, collection: 'results' }
)

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model('Data', DataSchema)
