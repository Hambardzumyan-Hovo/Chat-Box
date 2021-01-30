import { CircularProgress } from "@material-ui/core";
import React from "react";

const Loader = () => {
  return (
    <div className={"loader-container"}>
      <CircularProgress size={150} />
    </div>
  );
};

export default Loader;
