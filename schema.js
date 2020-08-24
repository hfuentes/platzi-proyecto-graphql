const { gql } = require('apollo-server-express')

module.exports = gql`

    type Curso {
        id: ID!
        titulo: String!
        descripcion: String!
        profesor: Profesor
        rating: Float
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