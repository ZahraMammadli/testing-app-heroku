import React, { useEffect, useState } from "react";
import WordCloud from "react-d3-cloud";
import "./wordcloud.css";
import { getWordCloudData } from "../../utils/Api";

export default function Words() {
  // get words data from server

  const [wordsList, setWordList] = useState([
    { text: "Hey", value: 1000 },
    { text: "lol", value: 200 },
    { text: "first impression", value: 800 },
    { text: "very cool", value: 1000000 },
    { text: "duck", value: 10 },
  ]);

  useEffect(() => {
    const getWordSample = async () => {
      let wordsSample = [];
      try {
        const response = await getWordCloudData();

        if (!response.ok) {
          throw new Error("something went wrong!");
        }

        const items = await response.json();

        items.map((item) =>
          wordsSample.push({
            text: item.parsed_value,
            value: item.count,
          })
        );
        setWordList(wordsSample);
      } catch (err) {
        console.error(err);
      }
    };

    getWordSample();
  }, []);
  const fontSize = (word) => word.value / 20;
  const rotate = (word) => (word.value % 90) - 45;
  //   this is the renedering part

  const newData = wordsList.map((item) => ({
    text: item.text,
    value: Math.random() * 1000,
  }));

  console.log(newData);

  return (
    <div>
      <h1>This is Word Cloud</h1>
      <h2>It indicates the most used keywrods in predictions</h2>
      <div className="wordcloud">
        <WordCloud
          width={1000}
          height={750}
          data={newData}
          fontSize={fontSize}
          rotate={rotate}
          padding={2}
        />
      </div>
    </div>
  );
}
