import React, { FC } from "react";
import { Grid } from "@material-ui/core";
import DetailsTableBody from "./DetailsTableBody/DetailsTableBody";
import MoveLabel from "./MoveLabel/MoveLabel";
import { MoveWithVersionData } from "../../../types";

type Props = {
  moves: MoveWithVersionData[];
  formatName: (str: string) => string;
};

const MovesTable: FC<Props> = ({ moves, formatName }: Props) => {
  const render = () => {
    if (moves) {
      return moves.map((move, moveIdx) => {
        return (
          <Grid container key={moveIdx}>
            <MoveLabel formatName={formatName} moveName={move.name} />
            <DetailsTableBody versionEntries={move.versionData} />
          </Grid>
        );
      });
    }
  };

  return <>{render()}</>;
};

export default MovesTable;
