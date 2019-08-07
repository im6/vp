import { buildSchema } from 'graphql';

const schemaStr = `
  enum ColorCategory {
    PUBLIC
    LIKES
    PROFILE
    ANONYMOUS
  }

  interface MutationResponse {
    status: Int!
  }

  type Color {
    id: ID!
    like: Int!
    color: String!
    userid: Int
    username: String
    createdate: String
  }

  type User {
    id: ID!
    img: String
    isadmin: Boolean
    name: String
    likes: [Int!]
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

  type AuthFailResponse implements MutationResponse {
    status: Int!
    url: String!
    error: String
  }

  union AuthOutputType = User | AuthFailResponse

  type Mutation {
    likeColor(input: LikeColorInputType!): LikeColorOutputType
    createColor(input: CreateColorInputType!): CreateColorOutputType
    adjudicateColor(input: LikeColorInputType!): AdjudicateColorOutputType
    logoff: AuthFailResponse
  }
  
  type Query {
    color(category: ColorCategory!): [Color]
    auth: AuthOutputType
  }

  schema {
    query: Query
    mutation: Mutation
  } 
`;

const schema = buildSchema(schemaStr);
export default schema;
