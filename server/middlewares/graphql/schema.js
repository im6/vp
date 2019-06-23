import { buildSchema } from 'graphql';

const schemaStr = `
  enum ColorCategory {
    PUBLIC
    LIKES
    PROFILE
    ANONYMOUS
  }

  type Color {
    id: Int!
    like: Int!
    color: String!
    userid: Int
    username: String
    createdate: String
  }
  type User {
    id: Int!
    oauth: String!
    name: String
    oauthid: String!
    isadmin: Boolean
    lastlogin: String
    img: String
    likes: [Int!]
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
    color(category: ColorCategory!): [Color]
    user(oauth: String, oauthid: String): User
  }
  schema {
    query: Query
    mutation: Mutation
  } 
`;

const schema = buildSchema(schemaStr);
export default schema;
