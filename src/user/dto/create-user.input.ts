import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsDefined } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsDefined()
  @IsArray()
  @Field((type) => [String], { defaultValue: [] })
  details: string[];
}
