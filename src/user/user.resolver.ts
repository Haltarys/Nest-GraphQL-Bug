import { UsePipes, ValidationPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';

@Resolver()
export class UserResolver {
  @Query((returns) => Boolean)
  foo(): boolean {
    return false;
  }

  @UsePipes(ValidationPipe)
  @Mutation((returns) => Boolean)
  async createUser(
    @Args('input', { type: () => CreateUserInput }) input: CreateUserInput,
  ): Promise<boolean> {
    console.log(input.details);
    return false;
  }
}
