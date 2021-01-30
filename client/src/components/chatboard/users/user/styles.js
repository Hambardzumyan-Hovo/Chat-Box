const { makeStyles } = require("@material-ui/core");

export const useStyles = makeStyles({
  user: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    margin: "8px",
    paddingBottom: "5px",
    cursor: "pointer",
    borderBottom: "1px solid #333",
    "&:hover": {
      boxShadow: "-9px 2px 2px -3px #42FF29",
      transition: "box-shadow 0.5s ease,transform 0.3s ease",
      transform: "scale(1.05)",
    },
  },

  active: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    margin: "10px",
    paddingBottom: "10px",
    cursor: "pointer",
    borderBottom: "1px solid #333",
    boxShadow: "-9px 2px 2px -3px #42FF29",
    transition: "box-shadow 0.5s ease,transform 0.3s ease",
    transform: "scale(1.05)",
  },

  avatar: {
    width: "60px",
    height: "60px",
  },
  offline: {
    backgroundColor: "#FF0000",
  },
  online: {
    backgroundColor: "#44b700",
  },
  newMessage: {
    backgroundColor: "#00AFD7",
  },
});
