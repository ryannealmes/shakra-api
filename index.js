const logger = require('./utils/logger')
const GraphQLServer = require('graphql-yoga').GraphQLServer
const mergeSchemas = require('graphql-tools').mergeSchemas
const remoteExecutableSchemas = require('./remoteExecutableSchemas')
require('dotenv').config()

async function run() {
  const schema = mergeSchemas({
    schemas: [
      await remoteExecutableSchemas.userServiceExecutableSchema(),
      await remoteExecutableSchemas.goalServiceExecutableSchema()
    ]
  })

  const server = new GraphQLServer({
    schema,
    context: context => {
      return {
        ...context
      }
    }
  })

  server.start({ port: process.env.PORT }, () =>
    logger.info(
      `The API server is running on http://localhost:${process.env.PORT}`
    )
  )
}

try {
  run()
} catch (e) {
  logger.error(e, e.message, e.stack)
}
