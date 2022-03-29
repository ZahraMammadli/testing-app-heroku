import React from "react";
import "./SinglePrediction.css";
import LeftMenu from "../../components/LeftMenu/LeftMenu";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import CommentList from "../../components/Comments/CommentsList";
import CommentForm from "../../components/Comments/Comments";
import { QUERY_SINGLE_PREDICTION } from "../../utils/queries";
import Nebula from "../../assets/videos/Nebula.mp4";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const TEXT_SIZE = 250;
const SinglePrediction = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { predictionId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_PREDICTION, {
    // pass URL parameter
    variables: { predictionId: predictionId },
  });

  const prediction = data?.prediction || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="sp-feature">
      <video
        autoPlay
        loop
        muted
        style={{
          position: "fixed",
          margin: "0",
          height: "100vh",
          width: "100vw",
          left: "50%",
          top: "50%",
          objectFit: "cover",
          transform: "translate(-50%,-50%)",
          zIndex: "-1",
        }}
      >
        <source src={Nebula} type="video/mp4" />
      </video>
      <div className="w-80">
        <div className="d-flex">
          <div className="left-menu">
            <LeftMenu />
          </div>
          <div className="center-col">
            <div className="feed-body">
              <Card
                sx={{
                  backgroundColor: "transparent",
                  color: "aliceblue",
                }}
              >
                <img
                  src={prediction.url}
                  width="100%"
                  frameBorder="0"
                  class="giphy-embed"
                  allowFullScreen
                  style={{
                    borderRadius: "25px",
                  }}
                ></img>
                <CardContent>
                  <Typography gutterBottom variant="h4" component="div">
                    "{prediction.predictionText}"
                  </Typography>
                  <Typography variant="body1" className="metadata">
                    Published By: {prediction.predictionAuthor}
                  </Typography>
                  <Typography variant="body1" className="metadata">
                    For: {prediction.predictionDate}
                  </Typography>
                </CardContent>
              </Card>

              <CommentList comments={prediction.comments} />

              <CommentForm className="pf-input" predictionId={prediction._id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePrediction;
