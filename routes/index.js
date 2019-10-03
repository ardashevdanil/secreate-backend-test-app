const express = require('express')
const itemController = require('../controllers/itemController')
const currencyController = require('../controllers/currency')
const router = express.Router()

// GET Currencies list.
router.get('/currencies', currencyController.currencyList)

// POST request for creating Item.
router.post('/item', itemController.itemCreate)

// DELETE request for deliting Item.
router.delete('/item/:id', itemController.itemDelete)

// GET Items list.
router.get('/items', itemController.itemList)

// GET request for Items sum.
router.get('/items/sum', itemController.itemSum)

module.exports = router
