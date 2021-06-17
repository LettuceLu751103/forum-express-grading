const express = require('express')
const app = express()
const port = 3000

const handlebars = require('express-handlebars')
const db = require('./models')





app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

require('./routes')(app)

module.exports = app
