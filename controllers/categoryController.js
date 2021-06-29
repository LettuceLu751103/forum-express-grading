const db = require('../models')
const Category = db.Category
const categoriesService = require('../services/categoriesService')

let categoryController = {
  getCategories: (req, res) => {
    categoriesService.getCategories(req, res, (data) => {
      console.log(data)
      return res.render('admin/categories', data)
    })
  },

  postCategories: (req, res) => {

    categoriesService.postCategories(req, res, (data) => {
      if (data['status'] === 'error') {
        req.flash('error_messages', data['message'])
        return res.redirect('back')
      } else {
        return Category.create({
          name: req.body.name
        })
          .then((category) => {
            res.redirect('/admin/categories')
          })
      }
    })

  },

  putCategory: (req, res) => {
    categoriesService.putCategories(req, res, (data) => {
      if (data['status'] === 'error') {
        req.flash('error_messages', data['message'])
        return res.redirect('back')
      } else {
        return Category.findByPk(req.params.id)
          .then((category) => {
            category.update(req.body)
              .then((category) => {
                res.redirect('/admin/categories')
              })
          })
      }
    })

  },

  // deleteCategory: (req, res) => {
  //   categoriesService.deleteCategories(req, res, (data) => {
  //     console.log(data)
  //     if (data['status'] === 'success') {
  //       return res.redirect('/admin/categories')
  //     }
  //   })
  // },
  deleteCategory: (req, res) => {
    categoriesService.deleteCategory(req, res, (data) => {
      if (data['status'] === 'success') {
        return res.redirect('/admin/categories')
      }
    })
  }
}
module.exports = categoryController