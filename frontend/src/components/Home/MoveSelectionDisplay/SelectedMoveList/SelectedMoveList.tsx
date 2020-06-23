import React, { FC } from "react";
import { Move } from "../../../../types";
import styles from "./styles";
import SelectedMoveItem from "./SelectedMoveItem/SelectedMoveItem";

type Props = {
  selectedMoves: Move[];
  removeSelectedMove: (move: Move) => void;
};

const SelectedMoveList: FC<Props> = ({ selectedMoves, removeSelectedMove }: Props) => {
  return (
    <div style={styles.selectedMovesContainerStyles}>
      {selectedMoves.map((move: Move, idx) => (
        <SelectedMoveItem key={idx} move={move} removeSelectedMove={removeSelectedMove} />
      ))}
    </div>
  );
};

export default SelectedMoveList;
