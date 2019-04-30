import { ArgsType, Field, InputType } from 'type-graphql'

@InputType('range')
class DateRange {

  @Field(_ => Date)
  from: Date

  @Field(_ => Date)
  to: Date
}

@ArgsType()
export default class ReservationsArgs {
  @Field(_ => String, { nullable: true })
  _id?: string

  @Field(_ => String, { nullable: true })
  firstName?: string

  @Field(_ => String, { nullable: true })
  lastName?: string

  @Field(_ => String, { nullable: true })
  hotelName?: string

  @Field(_ => String, { nullable: true })
  location?: string

  @Field(_ => String, { nullable: true })
  brand?: string

  @Field(_ => Date, { nullable: true })
  to?: Date

  @Field(_ => Date, { nullable: true })
  from?: Date

  @Field(_ => DateRange, { nullable: true })
  range?: DateRange
}
