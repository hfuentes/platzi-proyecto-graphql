module.exports = `
    type Curso {
        id: ID!
        titulo: String!
        descripcion: String!
        profesor: Profesor
        rating: Float @deprecated(reason: "No creemos más en los puntajes de cursos!")
        comentarios: [Comentario]
    }
    type Comentario {
        id: ID!
        nombre: String!
        cuerpo: String!
    }
    input NuevoCurso {
        titulo: String!
        descripcion: String!
        rating: Float
    }
    input CursoEditable {
        titulo: String
        descripcion: String
        rating: Float
    }
`