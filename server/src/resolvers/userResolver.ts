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

  @Query(() => User, {nullable: true})
  async auth(
    @Ctx() {em, req}: MyContext
  ): Promise<User | null> {

    console.log(req.session)

    if(!req.session.userId) {
      return null
    }

    const user = await em.findOne(User, {id: req.session.userId})

    return user

  }
  
  @Query(() => [User])
  users(@Ctx() { em }: MyContext): Promise<User[]> {
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

  @Mutation(() => User, {nullable: true})
  async login(
    @Ctx() { em, req }: MyContext,
    @Arg("options") options: UsernamePasswordInput
  ): Promise<User | null> {

    const user = await em.findOne(User, {username: options.username})

    if(user) {
      const verifyPassword = await argon2.verify(user.password, options.password)

      if(verifyPassword) {
        req.session.userId = user.id
        return user
      }
        
      return null

    }
    

    return null
  }

}
