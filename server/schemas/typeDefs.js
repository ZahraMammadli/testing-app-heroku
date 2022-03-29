const { gql } = require("apollo-server-express");
const { User } = require("../models");

const typeDefs = gql`
  type Query {
    msg: String
    users: [User]
    user(username: String!): User
    predictions: [Prediction]
    me: User
    prediction(predictionId: ID!): Prediction
  }

  type User {
    _id: ID
    username: String
    email: String
    password: String
    predictions: [Prediction]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Prediction {
    _id: ID
    predictionText: String
    predictionAuthor: String
    createdAt: String
    predictionDate: String
    tags: String
    url: String
    comments: [Comment]
  }
  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addComment(predictionId: ID!, commentText: String!): Prediction
    addPrediction(
      predictionText: String!
      predictionAuthor: String!
      predictionDate: String
      tags: String
      url: String
    ): Prediction
    removePrediction(predictionId: String!): Prediction
    removeComment(predictionId: ID!, commentId: ID!): Prediction
    searchingPredictions(searchString: String!): [Prediction]
  }
`;

module.exports = typeDefs;
