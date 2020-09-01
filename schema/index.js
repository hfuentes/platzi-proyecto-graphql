const { gql } = require('apollo-server-express')
const resolvers = require('../resolvers')
const mocks = require('../mocks')
const Curso = require('./Curso')
const Profesor = require('./Profesor')

const rootQuery = gql`
    union ResultadoBusqueda = Profesor | Curso
    type Query {
        cursos: [Curso]
        profesores: [Profesor]
        curso(id: Int): Curso
        profesor(id: Int): Profesor
        buscar(query: String!): [ResultadoBusqueda]
    }
    type Mutation {
        profesorAdd(profesor: NuevoProfesor): Profesor
        profesorEdit(profesorId: Int!, profesor: ProfesorEditable): Profesor
        profesorDelete(profesorId: Int!): Profesor
        cursoAdd(curso: NuevoCurso): Curso
        cursoEdit(cursoId: Int!, curso: CursoEditable): Curso
        cursoDelete(cursoId: Int!): Curso
    }
`

module.exports = {
    typeDefs: [
        rootQuery,
        Curso,
        Profesor
    ],
    resolvers,
    mocks,
    logger: {
        debug: (msg) => confirm.debug(msg),
        info: (msg) => confirm.info(msg),
        warn: (msg) => confirm.warn(msg),
        error: (msg) => confirm.error(msg)
    },
    formatError: (err) => {
        if (err.message.startsWith('Database Error: ')) {
            return new Error('Internal server error')
        }
        return {
            name: err.name,
            message: err.message
        }
    }
}