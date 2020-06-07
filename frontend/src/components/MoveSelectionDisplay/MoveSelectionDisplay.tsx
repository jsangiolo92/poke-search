import React, { FC, useContext } from "react";
import { navigate } from "@reach/router";
import { MovesContext } from "../../context/MovesContext";
import { Button } from "@material-ui/core";

type Move = {
  id: number;
  name: string;
  type: string;
  damageClass: string;
};

const selectedMovesContainerStyles = {
  display: "flex",
  flexDirection: "row" as "row",
};

const selectedMoveStyles = {
  margin: "0.5rem 0.5rem 0.5rem",
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

  const clearSearchSelections = () => {
    dispatch({
      type: "CLEAR_ALL",
    });
  };

  return (
    <>
      <span>Currently Selected Moves</span>
      <div style={selectedMovesContainerStyles}>
        {selectedMoves.map((move: Move) => (
          <div key={move.id} style={selectedMoveStyles}>
            {move.name}
          </div>
        ))}
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
