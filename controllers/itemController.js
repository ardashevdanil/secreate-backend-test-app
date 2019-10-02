const axios = require('axios')
const Ajv = require('ajv')
const Item = require('../models/item')
const Currency = require('../models/currency')
const itemJsonSchema = require('../schemas/item.json')

const ajv = new Ajv({ allErrors: true })

exports.itemList = async (req, res, next) => {
  try {
    res.json(await Item.find().populate('currency', 'name'))
  } catch (e) {
    if (e) return next(e)
  }
}

exports.itemCreate = async (req, res, next) => {
  try {
    const valid = ajv.validate(itemJsonSchema, req.body)

    if (!valid) throw new Error(ajv.errorsText())

    await Item.create({
      name: req.body.name,
      price: req.body.price,
      quantity: req.body.quantity,
      currency: req.body.currency
    })

    await res.sendStatus(201)
  } catch (e) {
    if (e) return next(e)
  }
}

exports.itemDelete = async (req, res, next) => {
  try {
    await Item.deleteOne({ _id: req.params.id })

    await res.sendStatus(204)
  } catch (e) {
    if (e) return next(e)
  }
}

exports.itemSum = async (req, res, next) => {
  try {
    const currencies = await Currency.find().select('name')
    const items = await Item.find().populate('currency', 'name').select('quantity price currency')
    const exchangeRates = await axios('https://www.cbr-xml-daily.ru/daily_json.js')
    const valutes = exchangeRates.data.Valute

    const sums = currencies.map((currency) => ({
      currency: currency.name,
      sum: items.reduce((prevSum, item) => {
        const itemRate = item.currency.name === 'RUB'
          ? 1
          : valutes[item.currency.name].Value / valutes[item.currency.name].Nominal

        const currencyRate = currency.name === 'RUB'
          ? 1
          : valutes[currency.name].Value / valutes[currency.name].Nominal

        return prevSum + item.quantity * item.price * itemRate / currencyRate
      }, 0).toFixed(2)
    }))

    res.json(sums)
  } catch (e) {
    if (e) return next(e)
  }
}
