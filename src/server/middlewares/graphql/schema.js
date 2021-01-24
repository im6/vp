import { buildSchema } from 'graphql';

const schemaStr = `
  enum ColorCategory {
    PUBLIC
    ANONYMOUS
  }

  interface MutationResponse {
    status: Int!
  }

  type Color {
    id: ID!
    star: Int!
    color: String!
    userId: ID
    username: String
    createdDate: String
  }

  type User {
    img: String
    isAdmin: Boolean
    name: String
    likes: [ID!]
    owns: [ID!]
  }

  input LikeColorInputType {
    id: ID!
    willLike: Boolean!
  }
  
  input CreateColorInputType {
    color: String!
  }

  type LikeColorOutputType implements MutationResponse {
    status: Int!
  }

  type AdjudicateColorOutputType implements MutationResponse {
    status: Int!
  }

  type CreateColorOutputType implements MutationResponse {
    status: Int!
    data: ID!
  }

  type Mutation {
    likeColor(input: LikeColorInputType!): LikeColorOutputType
    createColor(input: CreateColorInputType!): CreateColorOutputType
    adjudicateColor(input: LikeColorInputType!): AdjudicateColorOutputType
  }
  
  type Query {
    color(category: ColorCategory!): [Color]
    user: User
  }

  schema {
    query: Query
    mutation: Mutation
  } 
`;

const schema = buildSchema(schemaStr);
export default schema;
