const categoriesService = require('../../services/categoriesService')

const categoriesController = {
  getCategories: (req, res) => {
    categoriesService.getCategories(req, res, (data) => {
      // console.log(data)
      return res.json(data)
    })
  },

}

module.exports = categoriesController



