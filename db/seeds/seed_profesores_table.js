const casual = require('casual')

exports.seed = (knex) => {
    return knex('profesores').del().then(() => {
        return Promise.all(Array(10).fill().map((_, i) => {
            return knex('profesores').insert([{
                id: i + 1,
                nombre: casual.full_name,
                nacionalidad: casual.country,
                genero: casual.random_element(['MASCULINO', 'FEMENINO'])
            }])
        }))
    })
}