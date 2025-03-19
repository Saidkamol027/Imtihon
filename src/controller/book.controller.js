const { pool } = require('../config/db')

exports.getAllBooks = async (req, res) => {
	try {
		const books = await pool.query('SELECT * FROM books')
		res.status(200).json({
			message: 'success ✅',
			allBooksCount: books.rowCount,
			data: books.rows,
		})
	} catch (error) {
		res.status(500).json({ error: 'Server bilan muammo' })
	}
}

exports.getBookById = async (req, res) => {
	try {
		const { id } = req.params
		const book = await pool.query('SELECT * FROM books WHERE id = $1', [id])

		if (book.rowCount == 0) {
			res.status(400).json({ error: "Bunday 'id'lik kitob yo'q" })
		}

		res.status(200).json({ message: 'success ✅', data: book.rows[0] })
	} catch (error) {
		console.log(error.message)

		res.status(500).json({ error: 'Server bilan maummo' })
	}
}

exports.createBook = async (req, res) => {
	try {
		const { name, description, author_name, price, count } = req.body

		if (!name || !description || !author_name || !price || !count) {
			res.status(404).json({ error: "Iltimos hamma maydonlarni to'ldiring" })
		}

		const book = await pool.query(
			'INSERT INTO books (name, description, author_name, price, count) VALUES ($1, $2, $3, $4, $5) RETURNING *',
			[name, description, author_name, price, count]
		)

		res.status(200).json({ message: 'success ✅', data: book.rows })
	} catch (error) {
		res.status(500).json({ error: 'Server bilan muammo' })
	}
}

exports.udpateBook = async (req, res) => {
	try {
		const { id } = req.params
		const { name, description, author_name, price, count } = req.body

		if (!name || !description || !author_name || !price || !count) {
			return res
				.status(400)
				.json({ error: "Iltimos hamma maydonlarni to'ldiring" })
		}

		const book = await pool.query(
			'UPDATE books SET name = $1, description = $2, author_name = $3, price = $4, count = $5 WHERE id = $6 RETURNING *',
			[name, description, author_name, price, count, id]
		)

		if (book.rowCount == 0) {
			return res.status(400).json({ error: "Bunday 'id'lik book mavjud emas" })
		}

		res.status(200).json({
			message: 'success ✅',
			data: book.rows[0],
		})
	} catch (error) {
		res.status(500).json({ error: 'Server bilan muammo' })
	}
}

exports.deleteBook = async (req, res) => {
	try {
		const { id } = req.params
		const book = await pool.query(
			'DELETE FROM books WHERE 	id = $1 RETURNING *',
			[id]
		)

		if (book.rowCount == 0) {
			return res.status(404).json({ error: "Bunday 'id'lik kitob mavjud emas" })
		}

		res.status(200).json({ message: 'success ✅', data: book.rows[0] })
	} catch (error) {
		res.status(500).json({ error: 'Server bilan muammo' })
	}
}
