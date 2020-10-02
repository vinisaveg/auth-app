import { Query, Resolver } from "type-graphql";
@Resolver()
export class userResolver {
  @Query(() => String)
  hello() {
    return "Hello!";
  }
}
