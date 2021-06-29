const db = require('../models')
const Category = db.Category

let categoriesService = {
  getCategories: (req, res, callback) => {
    return Category.findAll({ raw: true, nest: true }).then(categories => {
      // console.log(categories)
      if (req.params.id) {
        Category.findByPk(req.params.id)
          .then((category) => {
            // console.log(categories)
            console.log(category)
            return res.render('admin/categories', { categories: categories, category: category })
          })
      } else {
        // console.log(categories)
        callback({ categories: categories })
      }
    })
  },
  postCategories: (req, res, callback) => {
    if (!req.body.name) {
      callback({ status: 'success', message: "name didn't exist" })
    } else {
      return Category.create({
        name: req.body.name
      })
        .then((category) => {
          callback({ status: 'success', message: 'restaurant was successfully created' })
        })
    }
  },

}
module.exports = categoriesService