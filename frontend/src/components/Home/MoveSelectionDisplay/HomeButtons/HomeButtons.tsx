import React, { FC } from "react";
import { Move } from "../../../../types";
import styles from "./styles";
import CoreButton from "../../../Buttons/CoreButton/CoreButton";

type Props = {
  selectedMoves: Move[];
  goToResults: () => void;
  clearSearchSelections: () => void;
};

const HomeButtons: FC<Props> = ({ selectedMoves, goToResults, clearSearchSelections }: Props) => {
  return (
    <div>
      <CoreButton
        disabled={!selectedMoves.length}
        variant={"contained"}
        color={"primary"}
        handleClick={goToResults}
        styles={styles.buttonStyles}
        text={"Search Pokemon"}
      />
      {!!selectedMoves.length && (
        <CoreButton
          variant={"outlined"}
          color="secondary"
          handleClick={clearSearchSelections}
          text={"Clear All Selections"}
        />
      )}
    </div>
  );
};

export default HomeButtons;
