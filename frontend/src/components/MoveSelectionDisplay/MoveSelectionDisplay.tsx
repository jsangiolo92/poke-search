import React, { FC, useContext } from "react";
import { navigate } from "@reach/router";
import { MovesContext } from "../../context/MovesContext";
import { Button, IconButton } from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { Move } from "../../types";
import { typeColorMap } from "../../data/type-color-map";

const selectedMovesContainerStyles = {
  display: "flex",
  flexDirection: "row" as "row",
  flexWrap: "wrap" as "wrap",
};

const selectedMoveStyles = {
  fontFamily: "Roboto",
  margin: "0.5rem 0.5rem 0.5rem",
  color: "white",
};

const selectedMoveBackgroundStyles = {
  borderRadius: "15%",
  padding: "0.5rem",
  margin: "0.5rem 0 0 0.5rem",
  minWidth: "6rem",
  height: "1rem",
  display: "flex",
  alignItems: "center",
};

const selectedMoveButtonStyles = {
  marginLeft: "auto",
  background: "white",
  borderRadius: "50%",
  cursor: "pointer",
};

const buttonStyles = {
  margin: "0.5rem 0.5rem",
};

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
      <div style={{ display: "flex", flexDirection: "row" }}>
        <span style={{ fontFamily: "Roboto", padding: "0.5rem", margin: "0.5rem 0 0 0" }}>
          Currently Selected Moves
        </span>
        <div style={selectedMovesContainerStyles}>
          {selectedMoves.map((move: Move) => (
            <div key={move.id} style={{ ...selectedMoveBackgroundStyles, background: typeColorMap[move.type] }}>
              <span style={selectedMoveStyles}>{move.name}</span>
              <HighlightOffIcon
                color="secondary"
                style={selectedMoveButtonStyles}
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
          style={buttonStyles}
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
