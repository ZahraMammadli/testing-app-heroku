import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import "./comments.css";
import { ADD_COMMENT } from "../../utils/mutations";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import Auth from "../../utils/auth";

const TEXT_SIZE = 250;
const CommentForm = ({ predictionId }) => {
  const [commentText, setCommentText] = useState("");
  const [characterCount, setCharacterCount] = useState(0);

  const [inputText, setInputText] = useState("");
  const [addComment, { error }] = useMutation(ADD_COMMENT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addComment({
        variables: {
          predictionId,
          commentText,
          commentAuthor: Auth.getProfile().data.username,
        },
      });

      setCommentText("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "commentText" && value.length <= 280) {
      setCommentText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      {Auth.loggedIn() ? (
        <>
          <div className="pf-body">
            <form onSubmit={handleFormSubmit}>
              <TextField
                id="outlined-basic"
                label="Enter the text here"
                className="pf-input"
                name="commentText"
                placeholder="Add your comment..."
                value={commentText}
                variant="outlined"
                onChange={handleChange}
              />
              <h4>Remaining chars: {TEXT_SIZE - inputText.length}</h4>

              <div className="pf-footer">
                <div className="pf-predict-btn">
                  <Button
                    type="submit"
                    variant="contained"
                    style={{
                      backgroundColor: "blue",
                    }}
                  >
                    Comment
                  </Button>
                </div>
              </div>
            </form>
          </div>
          ;
        </>
      ) : (
        <p>
          You need to be logged in to share your predictions. Please{" "}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default CommentForm;
