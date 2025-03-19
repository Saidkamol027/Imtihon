const { pool } = require('../config/db')

async function createTables() {
	try {
		await pool.query(`
            CREATE TABLE IF NOT EXISTS books (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
								author_name VARCHAR(255) NOT NULL,
								price NUMERIC(10,2) NOT NULL ,
								count SMALLINT NOT NULL
            );
            `)

		return "Database'da jadvallar yaratildi ✅"
	} catch (err) {
		throw new Error('Jadval yaratishda xatolik⚠️')
	}
}

module.exports = createTables
