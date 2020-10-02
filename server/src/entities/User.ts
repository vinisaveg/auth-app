import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
export class User {
  @PrimaryKey()
  @Field()
  id: string;

  @Property()
  @Field()
  username: string;

  @Property()
  @Field()
  password: string;

  @Property()
  @Field(() => Date)
  createdAt = new Date();
}
