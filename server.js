function generateShortLink(length) {
  var characters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 
                    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
                    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  var link = '';
  for (var i = 0; i < length; i++) {
    link += characters[Math.floor(Math.random() * characters.length)];
  }
  return link;
}

const express = require('express')
const mongoose = require('mongoose');
const { generate } = require('shortid');
const { db } = require('./models/shortLink')
const ShortLink = require('./models/shortLink')
const app = express()

mongoose.connect('mongodb://localhost/linkShortener', {
  useNewUrlParser: true, useUnifiedTopology: true
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.get('/', async (req, res) => {
  const shortLinks = await ShortLink.find()
  res.render('index', { shortLinks: shortLinks })
})

app.post('/shortLinks', async (req, res) => {
  await ShortLink.create({ full: req.body.fullLink })

  res.redirect('/')
})

app.get('/:shortLink', async (req, res) => {
  const shortLink = await ShortLink.findOne({ short: req.params.shortLink })
  if (shortLink == null) return res.sendStatus(404)
  
  shortLink.short = generateShortLink(7)
  shortLink.clicks++
  shortLink.save()

  res.redirect(shortLink.full)
})

app.listen(process.env.PORT || 3000);