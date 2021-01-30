import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  container: {
    display: "flex",
    flexWrap: "wrap",
    height: "80vh",
    overflowY: "scroll",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    padding: "10px 50px",
    justifyContent: "flex-end",
  },
});
