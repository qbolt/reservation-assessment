import { buildSchema } from 'type-graphql'
import { GraphQLSchema } from 'graphql'
import { ObjectId } from 'mongodb'

import { ReservationResolver, HotelResolver, LocationResolver, BrandResolver } from './resolvers'
import { TypegooseMiddleware } from './typegoose-middleware'
import { ObjectIdScalar } from './object-id.scalar'

async function initSchema (): Promise<GraphQLSchema> {
  return await buildSchema({
    validate: false,
    resolvers: [ ReservationResolver, HotelResolver, LocationResolver, BrandResolver ],
    globalMiddlewares: [ TypegooseMiddleware ],
    scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }]
  })
}

export default initSchema
