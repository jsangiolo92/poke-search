import React, { FC } from "react";
import { Grid, CardMedia } from "@material-ui/core";
import { typeIconMap } from "../../../../../data/icon-links";
import styles from "./styles";

type Props = {
  name: string;
  type: string;
};

const MoveCardHeader: FC<Props> = ({ name, type }: Props) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={8} style={styles.cardHeaderStyle}>
        {name}
      </Grid>
      <Grid item xs={2}>
        <CardMedia image={typeIconMap[type]} style={styles.imageStyle}></CardMedia>
      </Grid>
    </Grid>
  );
};

export default MoveCardHeader;
