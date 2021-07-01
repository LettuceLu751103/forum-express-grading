const express = require('express')
const router = express.Router()
const adminController = require('../controllers/api/adminController')
const categoriesController = require('../controllers/api/categoriesController')
const multer = require('multer')
const upload = multer({ dest: 'temp/' })
const userController = require('../controllers/api/userController.js')


router.get('/admin/restaurants', adminController.getRestaurants)
router.post('/admin/restaurants', upload.single('image'), adminController.postRestaurant)
router.put('/admin/restaurants/:id', upload.single('image'), adminController.putRestaurant)
router.get('/admin/restaurants/:id', adminController.getRestaurant)


router.delete('/admin/restaurants/:id', adminController.deleteRestaurant)


// category
router.get('/admin/categories', categoriesController.getCategories)
router.post('/admin/categories', categoriesController.postCategories)
router.put('/admin/categories/:id', categoriesController.putCategories)
router.delete('/admin/categories/:id', categoriesController.deleteCategories)


// JWT signin
router.post('/signin', userController.signIn)


module.exports = router

