const mongoose = require('mongoose')

const shortLinkSchema = new mongoose.Schema({
  full: {
    type: String,
    required: true
  },
  short: {
    type: String,
    required: true,
    default: 'fh723nv8' 
  },
  clicks: {
    type: Number,
    required: true,
    default: 0
  }
})

module.exports = mongoose.model('ShortLink', shortLinkSchema)