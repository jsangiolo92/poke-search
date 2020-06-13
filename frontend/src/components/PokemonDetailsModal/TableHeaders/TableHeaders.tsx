import React, { FC } from "react";
import { Grid } from "@material-ui/core";
import styles from "./styles";

const TableHeaders: FC = () => {
  return (
    <Grid container>
      <Grid item xs={3} style={styles.labelStyles}>
        Move
      </Grid>
      <Grid item xs={3} style={styles.labelStyles}>
        Version
      </Grid>
      <Grid item xs={3} style={styles.labelStyles}>
        Method
      </Grid>
      <Grid item xs={3} style={styles.labelStyles}>
        Level
      </Grid>
    </Grid>
  );
};

export default TableHeaders;
