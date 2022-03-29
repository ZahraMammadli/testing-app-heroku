import React from "react";
import "./comments.css";

import Typography from "@mui/material/Typography";

const CommentList = ({ comments = [] }) => {
  return (
    <>
      <div>
        {comments &&
          comments.map((comment) => (
            <div key={comment._id}>
              <div>
                <Typography gutterBottom variant="h5" component="div">
                  {comment.commentText}
                </Typography>
                <Typography variant="body1" className="metadata">
                  Commented By: {comment.commentAuthor}
                </Typography>
                <Typography variant="body1" className="metadata">
                  on: {comment.createdAt}
                </Typography>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default CommentList;
