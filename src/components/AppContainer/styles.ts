import { createStyles, Theme } from "@material-ui/core";

export default (theme: Theme) =>
  createStyles({
    root: {
      background: theme.palette.background.default,
      padding: "1em",
      minHeight: "100vh",
      overflowX: "hidden",
      boxSizing: "border-box"
    },
    container: {
      margin: "0 auto",
      [theme.breakpoints.up("md")]: {
        width: "80%",
        minHeight: "100%"
      }
    }
  });
