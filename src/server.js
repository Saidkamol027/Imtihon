const express = require('express')
const createTables = require('./model/db')
const { booksRoute } = require('./route/book.route')
const app = express()
app.use(express.json())

createTables()
	.then(data => console.log(data))
	.catch(err => console.log(err))

app.use('/api/books', booksRoute)

const port = process.env.PORT || 5000
app.listen(port, (req, res) => {
	console.log(`Server ${port} da ishlamoqda`)
})
