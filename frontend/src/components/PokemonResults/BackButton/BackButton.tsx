import React, { FC } from "react";
import { navigate } from "@reach/router";
import CoreButton from "../../Buttons/CoreButton/CoreButton";
import styles from "./styles";

const BackButton: FC = () => {
  const goBack = () => {
    navigate(-1);
  };

  return (
    <CoreButton
      variant={"contained"}
      color="primary"
      handleClick={goBack}
      styles={styles.buttonStyle}
      text={"Back to Search"}
    />
  );
};

export default BackButton;
