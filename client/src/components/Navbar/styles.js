import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  appBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#3f51b5",
    height: "10vh",
  },
  profile: {
    display: "inline-flex",
    justifyContent: "center",
    cursor: "pointer",
  },
});
