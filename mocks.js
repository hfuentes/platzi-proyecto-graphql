const casual = require('casual')

const SHOW_MOCKS = false

getMocks = (show) => {
    if (!show) return false
    return {
        Curso: () => ({
            titulo: casual.title,
            descripcion: casual.description,
            rating: casual.integer(from = 1, to = 10)
        }),
        Profesor: () => ({
            nombre: casual.full_name,
            nacionalidad: casual.country
        }),
        Comentario: () => ({
            nombre: casual.full_name,
            cuerpo: casual.sentences(n = 3)
        })
    }
}

module.exports = getMocks(SHOW_MOCKS)