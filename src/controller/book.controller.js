const { pool } = require('../config/db')

exports.getAllBooks = async (req, res) => {
	try {
		let {
			page = 1,
			limit = 10,
			sortBy = 'id',
			order = 'asc',
			author,
			title,
		} = req.query
		page = Number(page)
		limit = Number(limit)
		order = order.toLowerCase() === 'desc' ? 'DESC' : 'ASC'

		let filterConditions = []
		let values = []

		if (author) {
			values.push(`%${author}%`)
			filterConditions.push(`author ILIKE $${values.length}`)
		}

		if (title) {
			values.push(`%${title}%`)
			filterConditions.push(`title ILIKE $${values.length}`)
		}

		let filterQuery = filterConditions.length
			? `WHERE ${filterConditions.join(' AND ')}`
			: ''
		let offset = (page - 1) * limit
		const query = `
			SELECT * FROM books ${filterQuery} 
			ORDER BY ${sortBy} ${order}
			LIMIT $${values.length + 1} OFFSET $${values.length + 2}
		`
		values.push(limit, offset)

		const { rowCount, rows } = await pool.query(query, values)
		res.status(200).json({
			message: 'Success ✅',
			page,
			limit,
			allBooksCount: rowCount,
			data: rows,
		})
	} catch (error) {
		res.status(500).json({ error: 'Server bilan muammo' })
	}
}

exports.getBookById = async (req, res) => {
	try {
		const { id } = req.params
		const book = await pool.query('SELECT * FROM books WHERE id = $1', [id])

		if (book.rowCount === 0) {
			return res.status(404).json({ error: "Bunday 'id'lik kitob yo'q" })
		}

		res.status(200).json({ message: 'Success ✅', data: book.rows[0] })
	} catch (error) {
		res.status(500).json({ error: 'Server bilan muammo' })
	}
}

exports.createBook = async (req, res) => {
	try {
		const { name, description, author_name, price, count } = req.body

		if (!name || !description || !author_name || !price || !count) {
			return res
				.status(400)
				.json({ error: "Iltimos, hamma maydonlarni to'ldiring" })
		}

		const book = await pool.query(
			'INSERT INTO books (name, description, author_name, price, count) VALUES ($1, $2, $3, $4, $5) RETURNING *',
			[name, description, author_name, price, count]
		)

		res.status(201).json({ message: 'Success ✅', data: book.rows[0] })
	} catch (error) {
		res.status(500).json({ error: 'Server bilan muammo' })
	}
}

exports.updateBook1 = async (req, res) => {
	try {
		const { id } = req.params
		const { name, description, author_name, price, count } = req.body

		if (!name || !description || !author_name || !price || !count) {
			return res
				.status(400)
				.json({ error: "Iltimos, hamma maydonlarni to'ldiring" })
		}

		const book = await pool.query(
			'UPDATE books SET name = $1, description = $2, author_name = $3, price = $4, count = $5 WHERE id = $6 RETURNING *',
			[name, description, author_name, price, count, id]
		)

		if (book.rowCount === 0) {
			return res.status(404).json({ error: "Bunday 'id'lik kitob mavjud emas" })
		}

		res.status(200).json({
			message: 'Ma’lumotlar muvaffaqiyatli yangilandi ✅',
			data: book.rows[0],
		})
	} catch (error) {
		res.status(500).json({ error: 'Server bilan muammo' })
	}
}

exports.updateBook2 = async (req, res) => {
	try {
		const { id } = req.params
		const { name, description, author_name, price, count } = req.body

		const bookExists = await pool.query('SELECT * FROM books WHERE id = $1', [
			id,
		])
		if (bookExists.rowCount == 0) {
			return res.status(400).json({ error: "Bunday 'id'lik book mavjud emas" })
		}

		const existingBook = bookExists.rows[0]

		const updatedName = name || existingBook.name
		const updatedDescription = description || existingBook.description
		const updatedAuthor = author_name || existingBook.author_name
		const updatedPrice = price || existingBook.price
		const updatedCount = count || existingBook.count

		const book = await pool.query(
			'UPDATE books SET name = $1, description = $2, author_name = $3, price = $4, count = $5 WHERE id = $6 RETURNING *',
			[
				updatedName,
				updatedDescription,
				updatedAuthor,
				updatedPrice,
				updatedCount,
				id,
			]
		)

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
			'DELETE FROM books WHERE id = $1 RETURNING *',
			[id]
		)

		if (book.rowCount === 0) {
			return res.status(404).json({ error: "Bunday 'id'lik kitob mavjud emas" })
		}

		res.status(200).json({
			message: 'Kitob muvaffaqiyatli o‘chirildi ✅',
			data: book.rows[0],
		})
	} catch (error) {
		res.status(500).json({ error: 'Server bilan muammo' })
	}
}
