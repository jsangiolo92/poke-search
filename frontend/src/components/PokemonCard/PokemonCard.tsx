import React, { FC } from "react";
import { Card, CardHeader, CardMedia } from "@material-ui/core";
import { Pokemon } from "../../types";
import { typeColorMap } from "../../data/type-color-map";

type PokemonCardProps = {
  pokemon: Pokemon;
};

const cardStyle = {
  width: "20%",
  margin: "1rem",
  height: "9rem",
};

const cardHeaderStyle = {
  fontFamily: "Roboto",
  margin: "1rem 0 0 1rem",
  fontSize: "1.5rem",
  letterSpacing: "0.1rem",
};

const imageStyle = {
  width: "6rem",
  height: "6rem",
};

const titleContainerStyle = {
  display: "flex",
  justifyContent: "space-around" as "space-around",
};

const typesContainerStyle = {
  display: "flex",
  justifyContent: "start",
};

const baseTypeStyle = {
  fontFamily: "roboto",
  color: "white",
  padding: "0.25rem",
  width: "40%",
  textAlign: "center" as "center",
  borderRadius: "15%",
  margin: "0.5rem",
};

const PokemonCard: FC<PokemonCardProps> = ({ pokemon }: PokemonCardProps) => {
  const { id, name, moves, types } = pokemon;
  const imageUrl = `${process.env.IMAGE_URL}/${id}.png`;

  return (
    <Card style={cardStyle}>
      <div style={titleContainerStyle}>
        <div style={cardHeaderStyle}>{name}</div>
        <CardMedia image={imageUrl} style={imageStyle}></CardMedia>
      </div>
      <div style={typesContainerStyle}>
        {types.map((t, index) => (
          <span key={index} style={{ ...baseTypeStyle, background: typeColorMap[t] }}>
            {t.toUpperCase()}
          </span>
        ))}
      </div>
    </Card>
  );
};

export default PokemonCard;
