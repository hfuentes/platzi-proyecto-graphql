const { gql } = require('apollo-server-express')
const casual = require('casual')

const SHOW_MOCKS = true

const typeDefs = gql`
    type Curso {
        id: ID!
        titulo: String!
        descripcion: String!
        profesor: Profesor
        rating: Float @deprecated(reason: "No creemos más en los puntajes de cursos!")
        comentarios: [Comentario]
    }
    type Profesor {
        id: ID!
        nombre: String!
        nacionalidad: String!
        genero: Genero
        cursos: [Curso]
    }
    enum Genero {
        MASCULINO
        FEMENINO
    }
    type Comentario {
        id: ID!
        nombre: String!
        cuerpo: String!
    }
    type Query {
        cursos: [Curso]
        profesores: [Profesor]
        curso(id: Int): Curso
        profesor(id: Int): Profesor
    }
`

const resolvers = {
    Query: {
        cursos: () => [{ id: 1, titulo: "Curso Ejemplo", descripcion: "ASD123" }, { id: 1, titulo: "Curso 22", descripcion: "ASD123" }],
        profesores: () => {
            return new Promise((resolve, reject) => {
                return resolve([{
                    id: 99,
                    nombre: 'Hector'
                }])
            })
        }
    },
    Curso: {
        profesor: () => ({
            id: 44,
            nombre: 'Pablo'
        }),
        comentarios: () => ([{
            id: 33,
            nombre: "asd",
            cuerpo: "asdasdasd"
        }])
    }
}

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

module.exports = {
    typeDefs, resolvers, mocks: getMocks(SHOW_MOCKS), logger: {
        debug: (msg) => confirm.debug(msg),
        info: (msg) => confirm.info(msg),
        warn: (msg) => confirm.warn(msg),
        error: (msg) => confirm.error(msg)
    }
}