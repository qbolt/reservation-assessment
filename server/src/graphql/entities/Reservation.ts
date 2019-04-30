import { Field, ObjectType } from 'type-graphql'
import { prop as Property, Typegoose } from 'typegoose'
import { ObjectId } from 'mongodb'

@ObjectType()
export class Reservation extends Typegoose {

  @Field()
  readonly _id: ObjectId

  @Field()
  @Property({ required: true })
  firstName: string

  @Field()
  @Property({ required: true })
  lastName: string

  @Field()
  fullName (): string {
    return `${this.firstName} ${this.lastName}`
  }

  @Field()
  @Property({ required: true })
  hotelName: string

  @Field()
  @Property({ required: true })
  location: string

  @Field()
  @Property({ required: true })
  brand: string

  @Field()
  @Property({ required: true })
  from: Date

  @Field()
  @Property({ required: true })
  to: Date

  @Field()
  @Property({ default: new Date(), required: true })
  created: Date
}

export const ReservationModel = new Reservation().getModelForClass(Reservation)
