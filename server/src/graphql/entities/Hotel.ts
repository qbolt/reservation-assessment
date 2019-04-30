import { Field, ObjectType } from 'type-graphql'
import { prop as Property, Typegoose } from 'typegoose'
import { ObjectId } from 'mongodb'

@ObjectType()
export class Hotel extends Typegoose {

  @Field()
  readonly _id: ObjectId

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
  @Property({ default: new Date(), required: true })
  created: Date
}

export const HotelModel = new Hotel().getModelForClass(Hotel)
