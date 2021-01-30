import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  input: {
    width: "100%",
    "& .MuiOutlinedInput-root": {
      width: "100%",
      height: "100%",
      fontSize: "20px",
    },
  },
  sendArea: {
    display: "flex",
    height: "10vh",
  },
  sendBtn: {
    alignSelf: "flex-end",
    lineHeight: "44px",
    height: "100%",
  },
});
