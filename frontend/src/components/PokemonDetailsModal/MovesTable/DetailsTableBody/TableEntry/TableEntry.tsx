import React, { FC } from "react";
import { Grid } from "@material-ui/core";
import VersionLabel from "./VersionLabel/VersionLabel";
import { VersionData } from "../../../../../types";
import styles from "./styles";

type Props = {
  data: VersionData;
  idx: number;
};

const TableEntry: FC<Props> = ({ data, idx }: Props) => {
  const { version, learnMethod, level } = data;
  const background = idx % 2 === 1 ? "#EEEEEE" : "";
  return (
    <Grid container style={{ ...styles.movesEntryStyles, background }}>
      <Grid item xs={3}></Grid>
      <Grid item xs={3}>
        <VersionLabel entry={version} />
      </Grid>
      <Grid item xs={3}>
        {learnMethod}
      </Grid>
      {level && <Grid>{level}</Grid>}
    </Grid>
  );
};

export default TableEntry;
