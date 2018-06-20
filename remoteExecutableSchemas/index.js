// TODO - look at refactoring this with functional programming.
// The goal and user remote schemas are pretty much the same.
// First try include resolvers across schemas then see how this is affected.
const userServiceExecutableSchema = require('./user')
const goalServiceExecutableSchema = require('./goal')

module.exports = {
  userServiceExecutableSchema,
  goalServiceExecutableSchema
}
