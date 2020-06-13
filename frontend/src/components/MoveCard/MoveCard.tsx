import React, { FC, useContext, useState, useEffect } from "react";
import { MovesContext } from "../../context/MovesContext";
import { Card, CardMedia, Grid } from "@material-ui/core";
import { Move } from "../../types";
import { typeIconMap } from "../../data/icon-links";
import { typeColorMap } from "../../data/type-color-map";

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

const cardInfoContainer = {
  display: "flex",
  justifyContent: "start",
  margin: "2rem 0 0 0",
};

const cardHeaderStyle = {
  fontFamily: "Roboto",
  margin: "1rem 0 0 1rem",
  fontSize: "1.3rem",
};

const imageStyle = {
  margin: "1rem 0 0 0",
  width: "2rem",
  height: "2rem",
};

const baseTypeStyle = {
  fontFamily: "roboto",
  color: "white",
  padding: "0.25rem",
  width: "40%",
  textAlign: "center" as "center",
  borderRadius: "15%",
  margin: "0.5rem",
  background: "black",
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
    minHeight: "8rem",
    minWidth: "15rem",
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
      <div style={cardInfoContainer}>
        <span style={{ ...baseTypeStyle, background: typeColorMap[type] }}>{type.toUpperCase()}</span>
        <span style={{ ...baseTypeStyle, background: typeColorMap[damageClass] }}>{damageClass.toUpperCase()}</span>
      </div>
    </Card>
  );
};

export default MoveCard;
