module.exports = {
    development: {
        client: 'sqlite3',
        connection: {
            filename: `${__dirname}/db.sqlite`
        },
        userNullAsDefault: true
    },
    production: {

    }
}