const mongoose = require('mongoose')
const express = require('express')
var cors = require('cors')
const bodyParser = require('body-parser')
const logger = require('morgan')
const Data = require('./data')
const MongoClient = require('mongodb').MongoClient

const API_PORT = 3001
const app = express()
app.use(cors())
const router = express.Router()

const MONGO_DB_USER = 'Buffalo_Prenatal_Admin'
const MONGO_DB_PASSWORD = 'bvl1HMEuI6sicvdE'

// this is our MongoDB database
const dbRoute = `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@cluster0.rj6xf.mongodb.net/Cluster0?retryWrites=true&w=majority`

// connects our back end code with the database
// mongoose.connect(dbRoute, { useNewUrlParser: true, useUnifiedTopology: true })

const client = new MongoClient(dbRoute, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

client.connect((err) => {
  if (err) {
    console.log(err)
  }
  const collection = client.db('surveyResults').collection('test')
  // perform actions on the collection object
  client.close()
})

// mongoose.connect(dbRoute, {
//   auth: {
//     user: MONGO_DB_USER,
//     password: MONGO_DB_PASSWORD,
//   },
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })

let db = mongoose.connection

db.once('open', () => console.log('connected to the database'))

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// this is our get method
// this method fetches all available data in our database
router.get('/getData', (req, res) => {
  Data.find((err, data) => {
    if (err) return res.json({ success: false, error: err })
    return res.json({ success: true, data: data })
  })
})

// this is our update method
// this method overwrites existing data in our database
router.post('/updateData', (req, res) => {
  const { id, update } = req.body
  Data.findByIdAndUpdate(id, update, (err) => {
    if (err) return res.json({ success: false, error: err })
    return res.json({ success: true })
  })
})

// this is our delete method
// this method removes existing data in our database
router.delete('/deleteData', (req, res) => {
  const { id } = req.body
  Data.findByIdAndRemove(id, (err) => {
    if (err) return res.send(err)
    return res.json({ success: true })
  })
})

// this is our create method
// this method adds new data in our database
router.post('/putData', (req, res) => {
  let data = new Data()
  console.log('****************************************')
  console.log(req.body)
  const { id, message } = req.body

  if ((!id && id !== 0) || !message) {
    return res.json({
      success: false,
      error: 'INVALID INPUTS',
    })
  }
  data.message = message
  data.id = id
  data.save((err) => {
    if (err) return res.json({ success: false, error: err })
    return res.json({ success: true })
  })
})

// append /api for our http requests
app.use('/api', router)

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`))
