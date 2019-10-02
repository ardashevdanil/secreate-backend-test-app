const mongoose = require('mongoose')

const Schema = mongoose.Schema

const currencySchema = new Schema({
  name: {
    type: String,
    required: [true, 'Currence name is required']
  }
})

const Currency = mongoose.model('Currency', currencySchema)

module.exports = Currency
