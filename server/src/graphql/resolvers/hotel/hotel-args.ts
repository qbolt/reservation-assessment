import { ArgsType, Field } from 'type-graphql'

@ArgsType()
export default class HotelArgs {

  @Field(_ => String, { nullable: true })
  hotelName: string

  @Field(_ => String, { nullable: true })
  location: string

  @Field(_ => String, { nullable: true })
  brand: string

}
