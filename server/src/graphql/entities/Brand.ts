import { Field, ObjectType } from 'type-graphql'
import { prop as Property, Typegoose } from 'typegoose'
import { ObjectId } from 'mongodb'

@ObjectType()
export class Brand extends Typegoose {

  @Field()
  readonly _id: ObjectId

  @Field()
  @Property({ required: true })
  brand: string

  @Field()
  @Property({ default: new Date(), required: true })
  created: Date
}

export const BrandModel = new Brand().getModelForClass(Brand)
