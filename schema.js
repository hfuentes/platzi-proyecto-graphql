const { gql } = require('apollo-server-express')
const casual = require('casual')
const Curso = require('./models/Curso')
const Profesor = require('./models/Profesor')
const Comentario = require('./models/Comentario')

const SHOW_MOCKS = false

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
        cursos: () => Curso.query().eager('[profesor, comentarios]'),
        profesores: () => Profesor.query().eager('cursos'),
        curso: (rootValue, args) => Curso.query().findById(args.id).eager('[profesor, comentarios]'),
        profesor: (rootValue, args) => Profesor.query().findById(args.id).eager('cursos')
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