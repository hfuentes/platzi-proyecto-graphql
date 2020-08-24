const express = require('express')
const bodyParser = require('body-parser')
const { ApolloServer } = require('apollo-server-express')
const schema = require('./schema')

const server = new ApolloServer(schema)
const app = express()
server.applyMiddleware({ app })

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`)
})

app.on('error', err => {
    console.log(`Express error:`)
    console.error(err)
})

process.on('uncaughtException', err => {
    console.log(`Uncaught exception:`)
    console.error(err)
})