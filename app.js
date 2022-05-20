const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv/config')
const cors = require('cors')

//middleware
app.use(bodyParser.json())
app.use(cors())

//ROUTES
const postRoute = require('./routes/post')
app.use('/post', postRoute)

const aboutRoute = require('./routes/about')
app.use('/about', aboutRoute)

app.get('/', (req, res) => {
  res.send('Home Page')
})

//connect to db
mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log('connected to db')
  }
)

app.listen(5001, () => {
  console.log('App is listening on 5001..')
})
