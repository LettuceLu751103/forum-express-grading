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

}
module.exports = categoriesService