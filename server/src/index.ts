import { connect } from 'mongoose'
import 'reflect-metadata'
import { ApolloServer } from 'apollo-server'
import * as dotenv from 'dotenv'

dotenv.config()

import initSchema from './graphql'

async function bootstrap () {
  await connect(process.env.MONGO_URL || 'mongodb://localhost/reservations')

  const schema = await initSchema()

  const server = new ApolloServer({
    introspection: true,
    schema,
    playground: true
  })

  const { url } = await server.listen(process.env.PORT || 3000)
  console.log(`Server is running, GraphQL Playground available at ${url}`)
}

bootstrap()
