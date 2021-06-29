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
  putCategories: (req, res, callback) => {
    categoriesService.postCategories(req, res, (data) => {
      // console.log(data)
      return res.json(data)
    })
  },
}

module.exports = categoriesController



