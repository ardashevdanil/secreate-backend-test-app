const mongoose = require('mongoose')

const Schema = mongoose.Schema

const itemSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Currency name is required']
  },
  quantity: {
    type: Number,
    min: [1, 'Must be large than 0'],
    required: [true, 'Quantity is requred'],
    validate: {
      validator: Number.isInteger,
      message: '{VALUE} is not an integer value'
    }
  },
  price: {
    type: Number,
    required: [true, 'Price is requred'],
    validate: {
      validator: v => v > 0,
      message: '{VALUE} must be larger than 0'
    }
  },
  currency: {
    type: Schema.Types.ObjectId,
    ref: 'Currency',
    required: true
  }
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item
