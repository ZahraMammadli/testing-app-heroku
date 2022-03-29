const db = require("../config/connection");
const { User, Prediction } = require("../models");
const userSeeds = require("./userSeeds.json");
const predictionSeeds = require("./predictionSeeds.json");

db.once("open", async () => {
  try {
    await Prediction.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < predictionSeeds.length; i++) {
      const { _id, predictionAuthor } = await Prediction.create(
        predictionSeeds[i]
      );
      const user = await User.findOneAndUpdate(
        { username: predictionAuthor },
        {
          $addToSet: {
            thoughts: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("all done!");
  process.exit(0);
});
