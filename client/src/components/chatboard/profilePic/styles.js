import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  form: {
    display: "flex",
    flexDirection: "column",
  },
  profile: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "65%",
    margin: "auto",
    backgroundColor: "#F0F0F0",
  },
  avatar: {
    width: "150px",
    height: "150px",
  },
  imgContainer: {
    display: "flex",
    justifyContent: "center",
  },
  upload: {
    margin: "10px 0px",
  },
});
