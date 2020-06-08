import React, { FC } from "react";
import { Card, CardHeader, CardMedia } from "@material-ui/core";
import { Pokemon } from "../../types";

type PokemonCardProps = {
  pokemon: Pokemon;
};

const cardStyle = {
  width: "20%",
  margin: "1rem",
};

const imageStyle = {
  width: "5rem",
  height: "5rem",
};

const titleContainerStyle = {
  display: "flex",
  justifyContent: "space-around" as "space-around",
};

const typesContainerStyle = {
  display: "flex",
  justifyContent: "space-evenly" as "space-evenly",
  margin: "0 0 0.5rem 0",
};

const PokemonCard: FC<PokemonCardProps> = ({ pokemon }: PokemonCardProps) => {
  const { id, name, moves, types } = pokemon;
  const imageUrl = `${process.env.IMAGE_URL}/${id}.png`;

  return (
    <Card style={cardStyle}>
      <div style={titleContainerStyle}>
        <CardHeader title={name}></CardHeader>
        <CardMedia image={imageUrl} style={imageStyle}></CardMedia>
      </div>
      <div>
        {" "}
        Types:
        <div style={typesContainerStyle}>
          {types.map((t, index) => (
            <span key={index}>{t}</span>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default PokemonCard;
