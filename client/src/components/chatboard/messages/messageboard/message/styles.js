import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  container: {
    display: "flex",
  },
  msgSentContainer: {
    display: "flex",
    justifyContent: "flex-end",
  },
  msgReceivedContainer: {
    display: "flex",
    justifyContent: "flex-start",
  },
  msgSent: {
    width: "45%",
    wordBreak: "break-word",
    backgroundColor: "#4C7EFB",
    color: "white",
    borderRadius: "25px 25px 0 25px",
    fontSize: "20px",
    padding: "10px",
  },
  msgReceived: {
    width: "45%",
    wordBreak: "break-word",
    backgroundColor: "#FFFFFF",
    color: "#242424",
    borderRadius: "25px 25px 25px 0",
    fontSize: "20px",
    padding: "10px",
  },
});
