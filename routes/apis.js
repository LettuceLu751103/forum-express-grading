const express = require('express')
const router = express.Router()
const adminController = require('../controllers/api/adminController')
const categoriesController = require('../controllers/api/categoriesController')


router.get('/admin/restaurants', adminController.getRestaurants)
router.get('/admin/restaurants/:id', adminController.getRestaurant)
router.get('/admin/categories', categoriesController.getCategories)

router.delete('/admin/restaurants/:id', adminController.deleteRestaurant)

module.exports = router

