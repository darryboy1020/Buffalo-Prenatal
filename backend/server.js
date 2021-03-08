const mongoose = require('mongoose')
const express = require('express')
var cors = require('cors')
const bodyParser = require('body-parser')
const logger = require('morgan')
const Data = require('./data')

const API_PORT = 3001
const app = express()
app.use(cors())
const router = express.Router()

// this is our MongoDB database
const MONGO_DB_USER = 'Buffalo_Prenatal_Admin'
const MONGO_DB_PASSWORD = 'bvl1HMEuI6sicvdE'
const dbRoute = `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@cluster0.rj6xf.mongodb.net/SurveyResults?retryWrites=true&w=majority`

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true, useUnifiedTopology: true })

let db = mongoose.connection

db.once('open', () => console.log('connected to the database'))

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(logger('dev'))

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

// q1: SD 1
// q2: SD 1
// q3: SD 4

// q4: SD 1
// q5: SD 1
// q6: SD 1
// q7: SD 1
// q8: SD 1

// q9: SD 4
// q10: SD 4
// q11: SD 4

// q12: SA 9
// q13: SA 9
// q14: SA 9
// q15: SA 9
// q16: SA 9
// q17: SA 9
// q18: SA 9
// q19: SA 9
// q20: SA 9
// q21: SA 9
// q22: SA 9
// q23: SA 9

// q24: SA 9
// q25: SA 1
// q26: SA 9
// q27: SA 9

// q28: SA 9
// q29: SA 9
// q30: SA 9
// q31: SA 9

// this is our create methid
// this method adds new data in our database
router.post('/putData', (req, res) => {
  var agreeDict = {
    'Strongly disagree': 1,
    Disagree: 2,
    Neutral: 3,
    Agree: 4,
    'Stongly agree': 5,
  }
  let data = new Data()
  var responseData = {
    undermining: 0, //q 1-3
    allianceFactor: 0, //q 4-8
    gateKeeping: 0, //q 9-11
    positiveEngagement: 0, //q 12-23
    directCare: 0, //q 24-27
    financialProvision: 0, //q 28 - 31
  }
  Object.keys(req.body).forEach((key) => {
    data[key] = req.body[key]
  })

  data.save((err) => {
    if (err) return res.json({ success: false, error: err })
    return res.json({ success: true })
  })
})

// append /api for our http requests
app.use('/api', router)

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`))
