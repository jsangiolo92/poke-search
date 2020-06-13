import React, { FC } from "react";
import styles from "./styles";

const Loading: FC = () => {
  return (
    <div style={styles.loadingStyles}>
      <span>Loading...</span>
    </div>
  );
};

export default Loading;
