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
  users(@Ctx() { em, req }: MyContext): Promise<User[]> {
    console.log(req.session);
    return em.find(User, {});
  }

  @Mutation(() => User)
  async register(
    @Ctx() { em, req }: MyContext,
    @Arg("options") options: UsernamePasswordInput
  ): Promise<User | null> {
    const hashedPassword = await argon2.hash(options.password);

    const newUser = em.create(User, {
      username: options.username,
      password: hashedPassword,
    });

    await em.persistAndFlush(newUser);

    req.session.userId = newUser.id;

    return newUser;
  }
}
