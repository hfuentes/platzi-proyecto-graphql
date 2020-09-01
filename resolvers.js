const Curso = require('./models/Curso')
const Profesor = require('./models/Profesor')

module.exports = {
    Query: {
        cursos: () => Curso.query().eager('[profesor, comentarios]'),
        profesores: () => Profesor.query().eager('cursos'),
        curso: (_, args) => Curso.query().findById(args.id).eager('[profesor, comentarios]'),
        profesor: (_, args) => Profesor.query().findById(args.id).eager('cursos')
    },
    Mutation: {
        profesorAdd: (_, args) => Profesor.query().insert(args.profesor),
        profesorEdit: (_, args) => Profesor.query().patchAndFetchById(args.profesorId, args.profesor)
    }
}