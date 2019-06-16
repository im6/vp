import { buildSchema } from 'graphql';

const schemaStr = `
  type Color {
    id: Int!
    like: Int!
    color: String!
    userid: Int
    username: String
    display: Boolean
    createdate: String
  }
  type User {
    id: Int!
    oauth: String!
    name: String
    oauthid: String!
    isadmin: Boolean
    lastlogin: String
  }

  input LikeColorInputType {
    id: Int!
    willLike: Boolean!
  }
  input CreateColorInputType {
    color: String!
  }

  type LikeColorOutputType {
    error: Boolean!
    data: String
  }
  type CreateColorOutputType {
    error: Boolean!
    data: Int!
  }
  type AdjudicateColorOutputType {
    error: Boolean!
    data: String
  }


  type Mutation {
    likeColor(input: LikeColorInputType!): LikeColorOutputType
    createColor(input: CreateColorInputType!): CreateColorOutputType
    adjudicateColor(input: LikeColorInputType!): AdjudicateColorOutputType
  }
  type Query {
    color: [Color]
    user(oauth: String, oauthid: String): User
  }
  schema {
    query: Query
    mutation: Mutation
  } 
`;

const schema = buildSchema(schemaStr);
export default schema;
