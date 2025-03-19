# 2-oy yakuni uchun ichki imtihon shartlari

## Book modeli(table) uchun to'liq CRUD amali bajarilsin.

Book table:
    id: SERIAL PRIMARY KEY
    name: VARCHAR(255)
    description: TEXT
    author_name: VARCHAR(255)
    price: NUMERIC(10,2)
    count: SMALLINT

‼️ Book jadvalidagi barcha ustunlar NOT NULL constraint(cheklov)'ga ega
⚠️ Loyiha ishga tushirilganda jadval avtomatik tarzda database'da yaratilinishi kerak

Methodlar:
    1. GET -> /api/books -> barcha kitoblar kelishi kerak.
    Javob formati:    
            {
                message: "success",
                allBooksCount: number, <!-- Barcha kitoblar soni -->
                data: Book[]
            }
    2. GET -> /api/books/:id -> bir dona kitob id bo'yicha kelishi kerak
    Javob formati:    
            {
                message: "success",
                data: Book
            }
    3. POST -> /api/books -> kitob yaratish kerak
    Javob formati:    
            {
                message: "success",
                data: Book <!-- Yaratilgan kitob qaytarilishi kerak -->
            }
    4. PUT -> /api/books/:id -> kitobni to'liq yangilash
    Javob formati:    
            {
                message: "success",
                data: Book <!-- Yangilangan kitob qaytarilishi kerak -->
            }
    5. DELETE -> /api/books/:id -> kitobni o'chirib yuborish
    Javob formati: 404 No Content bo'lsin


🎯 Imtihon uchun ajratilgan vaqt 4 soat 30 daqiqadan iborat.
Barchaga omad 😉