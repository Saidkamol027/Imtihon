const { Router } = require('express')
const {
	getAllBooks,
	deleteBook,
	createBook,
	getBookById,
	udpateBook2,
	updateBook1,
	updateBook2,
} = require('../controller/book.controller')
const booksRoute = Router()

booksRoute.get('/', getAllBooks)
booksRoute.post('/', createBook)
booksRoute.get('/:id', getBookById)
booksRoute.put('/:id', updateBook1)
booksRoute.patch('/:id', updateBook2)
booksRoute.delete('/:id', deleteBook)

module.exports = { booksRoute }
