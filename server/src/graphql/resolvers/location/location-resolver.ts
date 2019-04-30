import { Query, Resolver } from 'type-graphql'

import { Hotel } from '../../entities/Hotel'
import { LocationModel, Location } from '../../entities/Location'

@Resolver(Hotel)
class HotelResolver {

  @Query(_ => [Location])
  async locations (): Promise<Location[]> {
    return LocationModel.find({})
  }

}

export default HotelResolver
