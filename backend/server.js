const mongoose = require('mongoose')
const express = require('express')
var cors = require('cors')
const bodyParser = require('body-parser')
const logger = require('morgan')
const Data = require('./data')
const QuickChart = require('quickchart-js')

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

// this is our create methid
// this method adds new data in our database
router.post('/putData', (req, res) => {
  let data = new Data()

  const myChart = new QuickChart()

  const labels = [
    'Undermining',
    'Alliance Factor',
    'Gate Keeping',
    'Positive Engagement',
    'Direct Care',
    'Financial Provision',
  ]

  var chartUrls = Object.keys(req.body.chartUrl).map((key, index) => {
    const myChart = new QuickChart()

    myChart
      .setConfig({
        type: 'bar',
        data: {
          labels: [labels[index]],
          datasets: [{ label: labels[index], data: [req.body[key]] }],
        },
      })
      .setWidth(400)
      .setHeight(200)
      .setBackgroundColor('transparent')

    // Print the chart URL
    return myChart.getUrl()
  })

  Object.keys(req.body).forEach((key) => {
    if (key != 'chartresults') {
      data[key] = req.body[key]
    }
  })

  data.save((err) => {
    if (err) return res.json({ success: false, error: err })
    return res.json({ success: true, chartUrls })
  })
})

// append /api for our http requests
app.use('/api', router)

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`))
