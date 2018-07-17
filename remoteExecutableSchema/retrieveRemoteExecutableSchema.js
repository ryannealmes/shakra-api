const fetch = require('node-fetch')

const {
  makeRemoteExecutableSchema,
  introspectSchema
} = require('graphql-tools')

const setContext = require('apollo-link-context').setContext
const createHttpLink = require('apollo-link-http').createHttpLink
const ApolloLink = require('apollo-link').ApolloLink

module.exports = async serviceUri => {
  const contextLink = setContext((request, previousContext) => {
    return {
      headers: {
        authorization:
          previousContext.graphqlContext.request.headers.authorization
      }
    }
  })

  const serviceLink = () => createHttpLink({ uri: serviceUri, fetch })
  const serviceSchemaDefinition = await introspectSchema(serviceLink())

  return makeRemoteExecutableSchema({
    schema: serviceSchemaDefinition,
    link: ApolloLink.from([contextLink, serviceLink()])
  })
}
