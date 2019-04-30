import { Args, Query, Resolver } from 'type-graphql'

import HotelArgs from './hotel-args'
import { Hotel, HotelModel } from '../../entities/Hotel'

@Resolver(Hotel)
class HotelResolver {

  @Query(_ => [Hotel])
  async hotels (@Args() args: HotelArgs): Promise<Hotel[]> {
    return HotelModel.find(args)
  }

}

export default HotelResolver
