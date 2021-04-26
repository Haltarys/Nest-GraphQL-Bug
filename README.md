# Nest-GraphQL-Bug

A repo that illustrate a bug in NestJS GraphQL

## Bug

Hello, I think I found a bug in the GraphQL package. I'm not sure if it's caused by `@nestjs/graphql` or `type-graphql`, which Nest seems to be using under the hood.

I am using the code first approach.

The `@Field()` decorator can take an options object to configure the GraphQL property to be nullable or not and to have a default value or not.

TLDR: the `defaultValue` option explicitly makes the property nullable (regardless of the `nullable` option), even though `null` may not be an acceptable value in an input type.

```ts
@InputType()
export class CreateUserInput {
  @Field((type) => [String], { defaultValue: [] })
  details: string[];
}
```

The previous code will generate the following schema.

```gql
input CreateUserInput {
  details: [String!] = []
}
```

This means that the values in the array must be non-null strings, that `details` has a default value of an empty array BUT `details` itself can be set to `null`.

This means that ALL the following mutations are valid but the last one should not. `details` should either be an array or not be present at all.

```gql
mutation CreateUser {
  explicit: createUser(input: { details: ["Nest", "is", "so", "cool"] })
  omitted: createUser(input: {})
  explicitly_null: createUser(input: { details: null })
}
```

Really, the typescript code above should produce the following schema (notice the TWO exclamation marks). Thus, the property does not accept `null` as an explicit value and uses the default value.

```gql
input CreateUserInput {
  details: [String!]! = []
}
```

What do you think ?
