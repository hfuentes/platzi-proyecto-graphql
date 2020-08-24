const casual = require('casual')

exports.seed = (knex) => {
    return knex('cursos').del().then(() => {
        return Promise.all(Array(10).fill().map((_, i) => {
            return knex('cursos').insert([{
                id: i + 1,
                titulo: casual.title,
                descripcion: casual.description,
                rating: casual.integer(from = 1, to = 10),
                profesor_id: casual.integer(from = 1, to = 10)
            }])
        }))
    })
}