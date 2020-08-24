const { gql } = require('apollo-server-express')

module.exports.typeDefs = gql`

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

module.exports.resolvers = {
    Query: {
        cursos: () => [{
            id: 1, titulo: "Curso Ejemplo", descripcion: "ASD123"
        }],
        profesores: () => {
            return new Promise((resolve, reject) => {
                return resolve([{
                    id: 99,
                    nombre: 'Hector'
                }])
            })
        }
    }
}