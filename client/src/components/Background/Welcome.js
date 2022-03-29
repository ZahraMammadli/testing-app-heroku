import * as React from "react";
import { ThemeProvider, makeStyles } from "@mui/styles";
import { Link } from "@material-ui/core";

const themeInstance = {
  background: "linear-gradient(45deg, #01497C 30%, #2A6F97 90%)",
};

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.background,
    border: 0,
    fontSize: 25,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(44, 125, 160)",
    color: "white",
    height: 55,
    padding: "0 30px",
  },
}));

function DeepChild() {
  const classes = useStyles();

  return (
    <div className="center_all">
      <button type="button" className={classes.root}>
        <Link underline="none" color="inherit" href="/">
          {" "}
          Try to Predict the Future
        </Link>
      </button>
    </div>
  );
}

export default function CenterTitle() {
  return (
    <ThemeProvider theme={themeInstance}>
      <DeepChild />
    </ThemeProvider>
  );
}
