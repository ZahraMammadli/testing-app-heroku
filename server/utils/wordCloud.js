const MonkeyLearn = require("monkeylearn");
const { Prediction } = require("../models");
require("dotenv").config();

let wordCloud = [];
async function generateWordCloud() {
  // get predictions texts and form and concatenate data
  const predictions = await Prediction.find().sort({ createdAt: -1 });
  let newWords = predictions.map((prediction) => prediction.predictionText);
  let myArray = [].concat.apply([], newWords);
  let words = myArray.join(" ");
  // Create new array with text to pass to ML model
  let data = [];
  data.push(words);

  // ML model to extract keywords
  let model_id = "ex_YCya9nrn";

  //   let wordCloudData;
  const ml = new MonkeyLearn(process.env.monkeyLearnAPIkey);

  try {
    const extractor = await ml.extractors.extract(model_id, data);

    wordCloud = extractor.body[0].extractions;
   
  } catch (error) {
    // handle error
    console.log(error);
    console.log(error.response);
  }
}

const getWordCloud = () => {
  return wordCloud;
};

module.exports = { generateWordCloud, getWordCloud };

// Use the API key from your account
