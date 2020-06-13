import React, { FC } from "react";
import { Grid } from "@material-ui/core";
import styles from "./styles";

type Props = {
  moveName: string;
  formatName: (str: string) => string;
};

const MoveLabel: FC<Props> = ({ moveName, formatName }: Props) => {
  return (
    <Grid item style={styles.moveNameStyles}>
      {formatName(moveName)}
    </Grid>
  );
};

export default MoveLabel;
