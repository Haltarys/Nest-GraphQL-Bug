import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsDefined } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsDefined()
  @IsArray()
  @Field((type) => [String], { nullable: false, defaultValue: [] })
  details: string[];
}
