import React, { FC, useContext } from "react";
import SelectedMoveList from "./SelectedMoveList/SelectedMoveList";
import HomeButtons from "./HomeButtons/HomeButtons";
import { navigate } from "@reach/router";
import { MovesContext } from "../../../context/MovesContext";
import { Move } from "../../../types";
import styles from "./styles";

const MoveSelectionDisplay: FC = () => {
  const {
    selectedMovesState: { selectedMoves },
    dispatch,
  } = useContext(MovesContext);

  const goToResults = () => {
    navigate("results");
  };

  const removeSelectedMove = (selectedMove: Move) => {
    dispatch({
      type: "REMOVE_MOVE",
      selectedMove,
    });
  };

  const clearSearchSelections = () => {
    dispatch({
      type: "CLEAR_ALL",
    });
  };

  return (
    <>
      <div style={styles.containerStyles}>
        <span style={styles.textStyles}>Currently Selected Moves</span>
        <SelectedMoveList selectedMoves={selectedMoves} removeSelectedMove={removeSelectedMove} />
      </div>
      <HomeButtons
        selectedMoves={selectedMoves}
        goToResults={goToResults}
        clearSearchSelections={clearSearchSelections}
      />
    </>
  );
};

export default MoveSelectionDisplay;
