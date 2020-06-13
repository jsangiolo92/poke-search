import React, { FC, useContext, useState, useEffect } from "react";
import { MovesContext } from "../../../../context/MovesContext";
import { Card } from "@material-ui/core";
import MoveCardHeader from "./MoveCardHeader/MoveCardHeader";
import MoveCardBody from "./MoveCardBody/MoveCardBody";
import { Move } from "../../../../types";
import styles from "./styles";

type MoveCardProps = {
  moveData: Move;
  selected: boolean;
};

type CardStyle = {
  width: string;
  margin: string;
  background: string;
  minHeight: string;
  minWidth: string;
};

const MoveCard: FC<MoveCardProps> = ({ moveData, selected }: MoveCardProps) => {
  const { name, type, damageClass } = moveData;
  const {
    selectedMovesState: { selectedMoves },
    dispatch,
  } = useContext(MovesContext);

  const [cardStyle, setCardStyle] = useState<CardStyle>(styles.baseStyle);

  useEffect(() => {
    setCardStyle({ ...cardStyle, background: selected ? "#A7DB8D" : "white" });
  }, [selectedMoves]);

  const selectMove = (selectedMove: Move) => {
    if (cardStyle.background === "white") {
      dispatch({
        type: "ADD_MOVE",
        selectedMove,
      });
      setCardStyle({ ...cardStyle, background: "#A7DB8D" });
    } else {
      dispatch({
        type: "REMOVE_MOVE",
        selectedMove,
      });
      setCardStyle({ ...cardStyle, background: "white" });
    }
  };
  return (
    <Card style={cardStyle} onClick={() => selectMove(moveData)}>
      <MoveCardHeader name={name} type={type} />
      <MoveCardBody type={type} damageClass={damageClass} />
    </Card>
  );
};

export default MoveCard;
