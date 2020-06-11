import React, { FC } from "react";
import { navigate } from "@reach/router";
import { Button } from "@material-ui/core";

const buttonStyle = {
  margin: "0 1rem 0 1rem",
};

const BackButton: FC = () => {
  const goBack = () => {
    navigate(-1);
  };

  return (
    <Button variant={"contained"} color="primary" onClick={goBack} style={buttonStyle}>
      Back to Search
    </Button>
  );
};

export default BackButton;
