import React, { FC, useContext } from "react";
import { navigate } from "@reach/router";
import { MovesContext } from "../../context/MovesContext";
import { Button } from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { Move } from "../../types";
import { typeColorMap } from "../../data/type-color-map";
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
        <div style={styles.selectedMovesContainerStyles}>
          {selectedMoves.map((move: Move) => (
            <div key={move.id} style={{ ...styles.selectedMoveBackgroundStyles, background: typeColorMap[move.type] }}>
              <span style={styles.selectedMoveStyles}>{move.name}</span>
              <HighlightOffIcon
                color="secondary"
                style={styles.selectedMoveButtonStyles}
                onClick={() => removeSelectedMove(move)}
              ></HighlightOffIcon>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Button
          disabled={!selectedMoves.length}
          variant={"contained"}
          color="primary"
          onClick={goToResults}
          style={styles.buttonStyles}
        >
          Search Pokemon
        </Button>
        {!!selectedMoves.length && (
          <Button variant={"outlined"} color="secondary" onClick={clearSearchSelections}>
            Clear All Selections
          </Button>
        )}
      </div>
    </>
  );
};

export default MoveSelectionDisplay;
