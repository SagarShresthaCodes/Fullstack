if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express') //import express from express library installed in npm
const app = express() //importing app portion of the express
const expressLayouts = require('express-ejs-layouts') //importing expressLayouts package

const indexRouter = require('./routes/index')

app.set('view engine', 'ejs') //ejs is used as the view engine
app.set('views', __dirname + '/views') //all the views of the app will go into the views folder
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

app.use('/', indexRouter)

app.listen(process.env.PORT || 3000)