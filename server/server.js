const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const { generateWordCloud, getWordCloud } = require("./utils/wordCloud");

const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// GET request for ALL reviews
app.get("/api/wordCloud", (req, res) => {
  res.json(getWordCloud());
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });

  // Populate the wordcloud if it doesnot exist;
  if (getWordCloud().length === 0) {
    generateWordCloud();
  }
});
