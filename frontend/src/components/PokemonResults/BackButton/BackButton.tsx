import React, { FC } from "react";
import { navigate } from "@reach/router";
import { Button } from "@material-ui/core";
import styles from "./styles";

const BackButton: FC = () => {
  const goBack = () => {
    navigate(-1);
  };

  return (
    <Button variant={"contained"} color="primary" onClick={goBack} style={styles.buttonStyle}>
      Back to Search
    </Button>
  );
};

export default BackButton;
