const { makeStyles } = require("@material-ui/core");

export const useStyles = makeStyles({
  users: {
    display: "flex",
    flexDirection: "column",
    border: "1px solid black",
    padding: "10px",
    height: "90vh",
    overflowY: "scroll",
    backgroundColor: "#F0F0F0",
  },
});
