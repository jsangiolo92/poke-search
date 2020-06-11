import React, { FC } from "react";
import { Button } from "@material-ui/core";
import styles from "./styles";

type Props = {
  runMovesFilter: () => void;
};

const ClearFiltersButton: FC<Props> = ({ runMovesFilter }: Props) => {
  return (
    <Button variant={"outlined"} color="secondary" onClick={runMovesFilter} style={styles.buttonStyle}>
      Remove Filters
    </Button>
  );
};

export default ClearFiltersButton;
