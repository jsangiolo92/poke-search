import React, { FC } from "react";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { typeColorMap } from "../../../../../data/type-color-map";
import { Move } from "../../../../../types";
import styles from "./styles";

type Props = {
  move: Move;
  removeSelectedMove: (move: Move) => void;
};

const SelectedMoveItem: FC<Props> = ({ move, removeSelectedMove }: Props) => {
  return (
    <div key={move.id} style={{ ...styles.selectedMoveBackgroundStyles, background: typeColorMap[move.type] }}>
      <span style={styles.selectedMoveStyles}>{move.name}</span>
      <HighlightOffIcon
        color="secondary"
        style={styles.selectedMoveButtonStyles}
        onClick={() => removeSelectedMove(move)}
      ></HighlightOffIcon>
    </div>
  );
};

export default SelectedMoveItem;
