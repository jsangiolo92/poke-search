import React, { FC, useContext, useState, useEffect } from "react";
import { MovesContext } from "../../context/MovesContext";
import { Card, CardHeader } from "@material-ui/core";

type Move = {
  id: number;
  name: string;
  type: string;
  damageClass: string;
};

type MoveCardProps = {
  moveData: Move;
  selected: boolean;
};

const cardInfoStyle = {
  display: "flex",
  flexDirection: "column" as "column",
  margin: "0 0 1rem 1rem",
};

const MoveCard: FC<MoveCardProps> = ({ moveData, selected }: MoveCardProps) => {
  const { name, type, damageClass } = moveData;
  const {
    selectedMovesState: { selectedMoves },
    dispatch,
  } = useContext(MovesContext);

  const [cardStyle, setCardStyle] = useState({
    width: "20%",
    margin: "1rem",
    background: "white",
  });

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
      <CardHeader title={name}></CardHeader>
      <div style={cardInfoStyle}>
        <span>Move Type: {type}</span>
        <span>Damage Type: {damageClass}</span>
      </div>
    </Card>
  );
};

export default MoveCard;
