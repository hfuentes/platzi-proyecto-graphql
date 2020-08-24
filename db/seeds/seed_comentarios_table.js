const casual = require('casual')

exports.seed = (knex) => {
    return knex('comentarios').del().then(() => {
        return Promise.all(Array(40).fill().map((_, i) => {
            return knex('comentarios').insert([{
                id: i + 1,
                nombre: casual.full_name,
                cuerpo: casual.sentences(n = 2),
                curso_id: casual.integer(from = 1, to = 10)
            }])
        }))
    })
}