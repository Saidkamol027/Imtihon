const { Router } = require('express')
const {
	getAllBooks,
	deleteBook,
	createBook,
	udpateBook,
	getBookById,
} = require('../controller/book.controller')
const booksRoute = Router()

booksRoute.get('/', getAllBooks)
booksRoute.post('/', createBook)
booksRoute.get('/:id', getBookById)
booksRoute.put('/:id', udpateBook)
booksRoute.delete('/:id', deleteBook)

module.exports = { booksRoute }
