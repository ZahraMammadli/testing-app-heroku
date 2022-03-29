// source for the giphy search box: https://github.com/sergiop/react-giphy-searchbox/blob/master/README.md

import React from "react";
import "./GiphyBox.css";
import ReactGiphySearchbox from "react-giphy-searchbox";

const GiphyBox = ({ setGiphyUrl }) => {
  return (
    <>
      <div className="searchboxWrapper">
        <ReactGiphySearchbox
          apiKey="7GziugKxtDS1CNfmNR3SLe4bjbPjxUfp"
          onSelect={(item) => {
            setGiphyUrl("https://i.giphy.com/media/" + item.id + "/giphy.webp");
          }}
          masonryConfig={[
            { columns: 2, imageWidth: 110, gutter: 5 },
            { mq: "700px", columns: 3, imageWidth: 120, gutter: 5 },
          ]}
        />
      </div>
    </>
  );
};

export default GiphyBox;
