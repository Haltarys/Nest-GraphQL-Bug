import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsDefined, ValidateIf } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsDefined()
  @IsArray()
  @ValidateIf(() => {
    // change this to true to enable validators
    return false;
  })
  @Field((type) => [String], { nullable: false, defaultValue: [] })
  details: string[];
}
