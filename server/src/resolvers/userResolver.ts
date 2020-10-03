import { User } from "../entities/User";
import { MyContext } from "src/types";
import argon2 from "argon2";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";

@InputType()
class UsernamePasswordInput {
  @Field()
  username: string;

  @Field()
  password: string;
}

@Resolver()
export class userResolver {
  @Query(() => [User])
  users(@Ctx() { em }: MyContext): Promise<User[]> {
    return em.find(User, {});
  }

  @Mutation(() => User)
  async register(
    @Ctx() { em }: MyContext,
    @Arg("options") options: UsernamePasswordInput
  ): Promise<User | null> {
    const hashedPassword = await argon2.hash(options.password);

    const newUser = em.create(User, {
      username: options.username,
      password: hashedPassword,
    });

    await em.persistAndFlush(newUser);

    return newUser;
  }
}
