const Curso = require('./models/Curso')
const Profesor = require('./models/Profesor')

module.exports = {
    Query: {
        cursos: () => Curso.query().eager('[profesor, comentarios]'),
        profesores: () => Profesor.query().eager('cursos'),
        curso: (_, args) => Curso.query().findById(args.id).eager('[profesor, comentarios]'),
        profesor: (_, args) => Profesor.query().findById(args.id).eager('cursos'),
        buscar: async (_, { query }) => {
            let cursos = await Curso.query()
                .where('titulo', 'like', `%${query}%`)
                .orWhere('descripcion', 'like', `%${query}%`)
            let profesores = await Profesor.query()
                .where('nombre', 'like', `%${query}%`)
                .orWhere('nacionalidad', 'like', `%${query}%`)
            return [...cursos, ...profesores]
        }
    },
    ResultadoBusqueda: {
        __resolveType: (obj) => {
            if (obj instanceof Curso) return 'Curso'
            if (obj instanceof Profesor) return 'Profesor'
            return undefined
        }
    },
    Mutation: {
        profesorAdd: async (_, args) => await Profesor.query().insert(args.profesor),
        profesorEdit: async (_, args) => await Profesor.query().patchAndFetchById(args.profesorId, args.profesor),
        profesorDelete: async (_, args) => {
            let profesor = await Profesor.query().findById(args.profesorId)
            let deletedRows = await Profesor.query().deleteById(args.profesorId)
            if (deletedRows > 0) return profesor
            throw new Error(`El profesor con id ${args.profesorId} no se pudo eliminar.`)
        },
        cursoAdd: async (_, args) => await Curso.query().insert(args.curso),
        cursoEdit: async (_, args) => await Curso.query().patchAndFetchById(args.cursoId, args.curso),
        cursoDelete: async (_, args) => {
            let curso = await Curso.query().findById(args.cursoId)
            await Curso.query().deleteById(args.cursoId)
            return curso
        }
    }
}