const logger = require('./utils/logger')
const GraphQLServer = require('graphql-yoga').GraphQLServer

const remoteExecutableSchema = require('./remoteExecutableSchema')
require('dotenv').config()

async function run() {
  const server = new GraphQLServer({
    schema: await remoteExecutableSchema(),
    context: context => {
      return {
        ...context
      }
    }
  })

  server.start(
    {
      port: process.env.PORT,
      tracing: true,
      cacheControl: true
    },
    () =>
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
