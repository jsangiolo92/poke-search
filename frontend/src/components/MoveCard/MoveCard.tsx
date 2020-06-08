import React, { FC, useContext, useState, useEffect } from "react";
import { MovesContext } from "../../context/MovesContext";
import { Card, CardMedia, Grid } from "@material-ui/core";
import { Move } from "../../types";
import { typeIconMap } from "../../data/icon-links";

type MoveCardProps = {
  moveData: Move;
  selected: boolean;
};

type CardStyle = {
  width: string;
  margin: string;
  background: string;
};

const cardInfoStyle = {
  display: "flex",
  flexDirection: "column" as "column",
  margin: "1rem 0 1rem 1rem",
  fontFamily: "Roboto",
  fontWeight: "bold" as "bold",
};

const cardHeaderStyle = {
  fontFamily: "Roboto",
  margin: "1rem 0 0 1rem",
  fontSize: "1.4rem",
};

const imageStyle = {
  margin: "1rem 0 0 0",
  width: "2rem",
  height: "2rem",
};

const MoveCard: FC<MoveCardProps> = ({ moveData, selected }: MoveCardProps) => {
  const { name, type, damageClass } = moveData;
  const {
    selectedMovesState: { selectedMoves },
    dispatch,
  } = useContext(MovesContext);

  const [cardStyle, setCardStyle] = useState<CardStyle>({
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
      <Grid container spacing={2}>
        <Grid item xs={8} style={cardHeaderStyle}>
          {name}
        </Grid>
        <Grid item xs={2}>
          <CardMedia image={typeIconMap[type]} style={imageStyle}></CardMedia>
        </Grid>
      </Grid>
      <div style={cardInfoStyle}>
        <div>
          <span style={{ color: "#3f51b5" }}>Move Type: </span>
          <span>{type}</span>
        </div>
        <div>
          <span style={{ color: "#3f51b5" }}>Damage Type: </span>
          <span>{damageClass}</span>
        </div>
      </div>
    </Card>
  );
};

export default MoveCard;
