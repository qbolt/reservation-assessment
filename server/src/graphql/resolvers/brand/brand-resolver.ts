import { Query, Resolver } from 'type-graphql'

import { Brand, BrandModel } from '../../entities/Brand'

@Resolver(Brand)
class BrandResolver {

  @Query(_ => [Brand])
  async brands (): Promise<Brand[]> {
    return BrandModel.find({})
  }

}

export default BrandResolver
