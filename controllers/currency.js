const Currency = require('../models/currency')

exports.currencyList = async (req, res, next) => {
  try {
    res.json(await Currency.find().select('name'))
  } catch (e) {
    if (e) return next(e)
  }
}
