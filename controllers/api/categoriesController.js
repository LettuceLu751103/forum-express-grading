const categoriesService = require('../../services/categoriesService')

const categoriesController = {
  getCategories: (req, res) => {
    categoriesService.getCategories(req, res, (data) => {
      // console.log(data)
      return res.json(data)
    })
  },
  postCategories: (req, res) => {
    categoriesService.postCategories(req, res, (data) => {
      // console.log(data)
      return res.json(data)
    })
  },
  putCategories: (req, res) => {
    categoriesService.postCategories(req, res, (data) => {
      // console.log(data)
      return res.json(data)
    })
  },
  deleteCategories: (req, res) => {
    categoriesService.deleteCategory(req, res, (data) => {
      return res.json(data)
    })
  }
}

module.exports = categoriesController



