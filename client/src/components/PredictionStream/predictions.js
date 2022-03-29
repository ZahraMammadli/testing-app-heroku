import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import "./Predictions.css";
import { Link } from "@material-ui/core";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function Predictions({ predictions, title }) {
  console.log(predictions);
  return (
    <div>
      {predictions &&
        predictions.map((prediction) => (
          <div key={prediction.id} className="feed-body">
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

              <CardActions>
                <div className="pf-footer">
                  <div className="pf-predict-btn">
                    <Button
                      variant="contained"
                      size="small"
                      style={{
                        backgroundColor: "blue",
                      }}
                    >
                      <Link
                        underline="none"
                        color="inherit"
                        href={"/singlePrediction/" + prediction._id}
                      >
                        Comment
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardActions>
            </Card>
          </div>
        ))}
    </div>
  );
}
