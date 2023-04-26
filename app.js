const express = require('express')
const app = express()
const port = 3000

const exphdb = require('express-handlebars')
const restaurantList = require('./restaurant.json')

app.engine('handlebars', exphdb({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

app.get('/restaurants/:rest_id', (req, res) => {
  const rest = restaurantList.results.find(rest =>
    rest.id.toString() === req.params.rest_id
  )
  res.render('show', { restaurant: rest })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(rest => { return rest.name.toLowerCase().includes(keyword.toLowerCase()) || rest.category.toLowerCase().includes(keyword.toLowerCase()) })
  res.render('index', { restaurants: restaurants, keyword: keyword })
})

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})