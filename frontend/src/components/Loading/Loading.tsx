import React, { FC } from "react";

const styles = {
  position: "fixed" as "fixed",
  top: "50%",
  left: "50%",
  fontSize: "2rem",
};

const Loading: FC = () => {
  return (
    <div style={styles}>
      <span>Loading...</span>
    </div>
  );
};

export default Loading;
