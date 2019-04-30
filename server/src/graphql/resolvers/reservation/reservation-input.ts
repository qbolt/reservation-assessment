import { Field, InputType } from 'type-graphql'
import { Reservation } from '../../entities/Reservation'

@InputType()
export default class ReservationInput implements Partial<Reservation> {
  @Field()
  firstName: string

  @Field()
  lastName: string

  @Field()
  hotelName: string

  @Field()
  location: string

  @Field()
  brand: string

  @Field()
  to: Date

  @Field()
  from: Date
}
