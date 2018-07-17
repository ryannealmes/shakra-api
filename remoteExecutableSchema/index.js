const mergeSchemas = require('graphql-tools').mergeSchemas
const logger = require('../utils').logger
const retrieveRemoteExecutableSchema = require('./retrieveRemoteExecutableSchema')

module.exports = async () => {
  const schemas = []
  const serviceUris = [
    process.env.USER_SERVICE_URI,
    process.env.GOAL_SERVICE_URI
  ]

  for (const uri of serviceUris) {
    try {
      let executableSchema = await retrieveRemoteExecutableSchema(uri)
      if (executableSchema) {
        schemas.push(executableSchema)
      }
    } catch (error) {
      logger.error(error)
    }
  }

  return mergeSchemas({ schemas })
}
