import * as React from "react";
import Predictions from "./predictions";

const Feed = ({ predictions, loading }) => {
  return (
    <main>
      <div>
        <div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <Predictions predictions={predictions} />
          )}
        </div>
      </div>
    </main>
  );
};

export default Feed;
