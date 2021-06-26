const db = require('../models')
const Restaurant = db.Restaurant
const Category = db.Category
const pageLimit = 10
const Comment = db.Comment
const User = db.User




const restController = {
  getRestaurants: (req, res) => {
    let offset = 0
    const whereQuery = {}
    let categoryId = ''
    if (req.query.page) {
      offset = (req.query.page - 1) * pageLimit
    }
    if (req.query.categoryId) {
      categoryId = Number(req.query.categoryId)
      whereQuery.CategoryId = categoryId
    }
    Restaurant.findAndCountAll({
      include: Category,
      where: whereQuery,
      offset: offset,
      limit: pageLimit
    })
      .then(result => {
        // data for pagination
        const page = Number(req.query.page) || 1
        const pages = Math.ceil(result.count / pageLimit)
        const totalPage = Array.from({ length: pages }).map((item, index) => index + 1)
        const prev = page - 1 < 1 ? 1 : page - 1
        const next = page + 1 > pages ? pages : page + 1

        const data = result.rows.map(r => ({
          ...r.dataValues,
          description: r.dataValues.description.substring(0, 50),
          categoryName: r.Category.name,
          isFavorited: req.user.FavoritedRestaurants.map(d => d.id).includes(r.id)
        }))

        Category.findAll({
          raw: true,
          nest: true
        }).then(categories => {
          return res.render('restaurants', {
            restaurants: data,
            categories: categories,
            categoryId: categoryId,
            page: page,
            totalPage: totalPage,
            prev: prev,
            next: next
          })
        })

      })

  },

  getRestaurant: (req, res) => {
    return Restaurant.findByPk(req.params.id, {
      include: [
        Category,
        { model: User, as: 'FavoritedUsers' },
        { model: Comment, include: [User] }
      ]
    })
      .then(restaurant => {
        const isFavorited = restaurant.FavoritedUsers.map(d => d.id).includes(req.user.id)
        console.log(restaurant)
        restaurant.update({
          name: restaurant.name,
          tel: restaurant.tel,
          address: restaurant.address,
          opening_hours: restaurant.opening_hours,
          description: restaurant.description,
          image: restaurant.image,
          viewcount: String(Number(restaurant.viewcount) + 1)
        })
        return res.render('restaurant', {
          restaurant: restaurant.toJSON(),
          isFavorited: isFavorited
        })
      })
  },

  getFeeds: (req, res) => {
    return Promise.all([
      Restaurant.findAll({
        limit: 10,
        raw: true,
        nest: true,
        order: [['createdAt', 'DESC']],
        include: [Category]
      }),
      Comment.findAll({
        limit: 10,
        raw: true,
        nest: true,
        order: [['createdAt', 'DESC']],
        include: [User, Restaurant]
      })
    ])
      .then(([restaurants, comments]) => {
        return res.render('feeds', {
          restaurants: restaurants,
          comments: comments
        })
      })
  },

  getDashboard: (req, res) => {
    console.log(req.params.id)
    const whereQuery = {}
    if (req.params.id) {
      whereQuery.RestaurantId = req.params.id
    }
    return Promise.all([
      Restaurant.findByPk(req.params.id, {
        include: [
          Category,
          { model: Comment, include: [User] }
        ]
      }),
      Comment.findAll({
        raw: true,
        nest: true,
        where: whereQuery,
      })
    ])
      .then(([restaurant, comments]) => {
        // console.log(restaurant.name)
        // console.log(comments)
        const commentsTimes = comments.length
        return res.render('dashboard', {
          restaurant: restaurant.toJSON(),
          commentsTimes: commentsTimes,
          comments: comments
        })
      })
  }
}




module.exports = restController