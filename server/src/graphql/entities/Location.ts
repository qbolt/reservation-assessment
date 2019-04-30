import { Field, ObjectType } from 'type-graphql'
import { prop as Property, Typegoose } from 'typegoose'
import { ObjectId } from 'mongodb'

@ObjectType()
export class Location extends Typegoose {

  @Field()
  readonly _id: ObjectId

  @Field()
  @Property({ required: true })
  location: string

  @Field()
  @Property({ default: new Date(), required: true })
  created: Date
}

export const LocationModel = new Location().getModelForClass(Location)
