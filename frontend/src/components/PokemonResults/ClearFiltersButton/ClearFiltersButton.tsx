import React, { FC } from "react";
import CoreButton from "../../Buttons/CoreButton/CoreButton";
import styles from "./styles";

type Props = {
  runMovesFilter: () => void;
};

const ClearFiltersButton: FC<Props> = ({ runMovesFilter }: Props) => {
  return (
    <CoreButton
      variant={"outlined"}
      color="secondary"
      handleClick={runMovesFilter}
      styles={styles.buttonStyle}
      text={"Remove Filters"}
    />
  );
};

export default ClearFiltersButton;
