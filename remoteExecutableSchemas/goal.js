const fetch = require('node-fetch')

const {
  makeRemoteExecutableSchema,
  introspectSchema
} = require('graphql-tools')

const setContext = require('apollo-link-context').setContext
const createHttpLink = require('apollo-link-http').createHttpLink
const ApolloLink = require('apollo-link').ApolloLink

module.exports = async () => {
  const contextLink = setContext((request, previousContext) => {
    return {
      headers: {
        authorization: previousContext.graphqlContext.request.headers.authorization
      }
    }
  })

  const goalServiceLink = () => createHttpLink({
    uri: process.env.GOAL_SERVICE_URI,
    fetch
  })

  const goalServiceSchemaDefinition = await introspectSchema(goalServiceLink())

  return makeRemoteExecutableSchema({
    schema: goalServiceSchemaDefinition,
    link: ApolloLink.from([contextLink, goalServiceLink()])
  })
}
