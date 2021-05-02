const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const Data = require('./data');
const QuickChart = require('quickchart-js');
const path = require('path');
const nodemailer = require('nodemailer');
const pdf = require('pdf-creator-node');
var fs = require('fs');

const API_PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());
const router = express.Router();

// this is our MongoDB database
const MONGO_DB_USER = 'Buffalo_Prenatal_Admin';
const MONGO_DB_PASSWORD = 'bvl1HMEuI6sicvdE';
const dbRoute = `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@cluster0.rj6xf.mongodb.net/SurveyResults?retryWrites=true&w=majority`;

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(logger('dev'));

// append /api for our http requests
app.use('/api', router);

//serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('client/dist'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
  });
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'buffaloprenataltest@gmail.com',
    pass: 'gdgotcykfzpcemzn',
  },
});

const sendEmailResults = (chartUrls) => {
  // Read HTML Template
  var html = fs.readFileSync('pdfTemplate.html', 'utf8');

  var imageTemplate = '';

  chartUrls.forEach((url) => {
    imageTemplate += `<img src=${url} alt=${url} key=${url} /><br/>`;
  });

  const emailTemplate = `<h1>FATHERHOOD INITIATIVE</h1>
  <h2><p>Based on your results of the surveys we have put together a
  rubric of your current levels of engagement in the focal categories.
  These results are not permanent and are subject to change as you
  progress through the course.</p></h2><br/>${imageTemplate}`;

  pdfOptions = {
    format: 'A3',
    orientation: 'portrait',
    border: '10mm',
  };

  const document = {
    html: html,
    data: {
      chartUrls,
    },
    path: './output.pdf',
    type: '',
  };

  pdf
    .create(document, pdfOptions)
    .then((res) => {
      console.log(res);
      var mailOptions = {
        from: 'buffaloprenataltest@gmail.com',
        to: 'bolanosjohn21@gmail.com, darrien.johnson@gmail.com ',
        subject: 'Buffalo Fatherhood Initiative Survey Results',
        html: emailTemplate,
        attachments: [
          {
            filename: 'surveyResults.pdf',
            content: fs.createReadStream('output.pdf'),
          },
        ],
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          fs.unlink(__dirname + '/output.pdf', function (err) {
            if (err) {
              console.error(err);
            }
            console.log('File has been Deleted');
          });
        }
      });
    })
    .catch((error) => {
      console.error(error);
    });
};

const getChartUrl = (body) => {
  const labels = [
    'Undermining',
    'Alliance Factor',
    'Gate Keeping',
    'Positive Engagement',
    'Direct Care',
    'Financial Provision',
  ];

  const maxValues = [15, 25, 15, 108, 36];

  return Object.keys(body.chartresults).map((key, index) => {
    const myChart = new QuickChart();

    const stepSize = index < 3 ? 5 : 9;

    myChart
      .setConfig({
        type: 'bar',
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  min: 0,
                  max: maxValues[index],
                  stepSize: stepSize,
                },
              },
            ],
          },
        },
        data: {
          labels: [labels[index]],
          datasets: [{ label: labels[index], data: [body[key]] }],
        },
      })
      .setWidth(400)
      .setHeight(200)
      .setBackgroundColor('transparent');

    // Print the chart URL
    return myChart.getUrl();
  });
};

// this is our get method
// this method fetches all available data in our database
router.get('/getData', (req, res) => {
  Data.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

// this is our update method
// this method overwrites existing data in our database
router.post('/updateData', (req, res) => {
  const { id, update } = req.body;
  Data.findByIdAndUpdate(id, update, (err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// this is our delete method
// this method removes existing data in our database
router.delete('/deleteData', (req, res) => {
  const { id } = req.body;
  Data.findByIdAndRemove(id, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// this is our create methid
// this method adds new data in our database
router.post('/putData', (req, res) => {
  let data = new Data();

  const chartUrls = getChartUrl(req.body);

  Object.keys(req.body).forEach((key) => {
    if (key !== 'chartresults') {
      data[key] = req.body[key];
    }
  });

  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, chartUrls });
  });

  sendEmailResults(chartUrls);
});

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
