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
        authorization:
          previousContext.graphqlContext.request.headers.authorization
      }
    }
  })

  const userServiceLink = () =>
    createHttpLink({
      uri: process.env.USER_SERVICE_URI,
      fetch
    })

  const userServiceSchemaDefinition = await introspectSchema(userServiceLink())

  return makeRemoteExecutableSchema({
    schema: userServiceSchemaDefinition,
    link: ApolloLink.from([contextLink, userServiceLink()])
  })
}
