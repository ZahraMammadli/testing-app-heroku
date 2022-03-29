import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
export const ADD_PREDICTION = gql`
  mutation (
    $predictionText: String!
    $predictionAuthor: String!
    $tags: String
    $predictionDate: String
    $url: String
  ) {
    addPrediction(
      predictionText: $predictionText
      predictionAuthor: $predictionAuthor
      tags: $tags
      predictionDate: $predictionDate
      url: $url
    ) {
      _id
      predictionText
      predictionAuthor
      createdAt
      predictionDate
      tags
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($predictionId: ID!, $commentText: String!) {
    addComment(predictionId: $predictionId, commentText: $commentText) {
      _id
      predictionText
      predictionAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;

//search feature

export const SEARCH_PREDICTIONS = gql`
  mutation searchPredictions($searchString: String!) {
    searchingPredictions(searchString: $searchString) {
      _id
      predictionText
      predictionAuthor
      createdAt
      predictionDate
      url
    }
  }
`;
