const { AuthenticationError } = require("apollo-server-express");
const { User, Prediction } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    msg: () => {
      return "hello world";
    },
    users: async () => {
      return User.find();
    },
    user: async (parent, args) => {
      return User.find(args.username);
    },
    predictions: async (parent, { username }) => {
      const params = username ? { username } : {};
      const result = Prediction.find().sort({ createdAt: -1 });
      console.log(result);
      return result;
    },

    //wordCloud: return wordCloud;
    prediction: async (parent, { predictionId }) => {
      return Prediction.findOne({ _id: predictionId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("predictions");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { user, token };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },

    //  Todo: replace prediction Author by user. Update both prediction and User
    addPrediction: async (
      parent,
      { predictionText, predictionAuthor, tags, predictionDate, url }
    ) => {
      const prediction = Prediction.create({
        predictionText,
        predictionAuthor,
        tags,
        predictionDate,
        url,
      });

      await User.findOneAndUpdate(
        { username: predictionAuthor },
        { $addToSet: { predictions: prediction._id } }
      );

      return prediction;
    },
    addComment: async (parent, { predictionId, commentText }, context) => {
      if (context.user) {
        return Prediction.findOneAndUpdate(
          { _id: predictionId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removeComment: async (parent, { predictionId, commentId }, context) => {
      if (context.user) {
        return Prediction.findOneAndUpdate(
          { _id: predictionId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    //search feature
    searchingPredictions: async (parent, { searchString }) => {
      const result = await Prediction.find({
        predictionText: { $regex: searchString, $options: "i" },
      });
      return result;
    },
  },
};

module.exports = resolvers;
