import React, { FC } from "react";
import { Card } from "@material-ui/core";
import PokemonCardHeader from "./PokemonCardHeader/PokemonCardHeader";
import PokemonCardBody from "./PokemonCardBody/PokemonCardBody";
import { Pokemon } from "../../types";
import styles from "./styles";

type PokemonCardProps = {
  pokemon: Pokemon;
};

const PokemonCard: FC<PokemonCardProps> = ({ pokemon }: PokemonCardProps) => {
  const { id, name, moves, types } = pokemon;

  return (
    <Card style={styles.cardStyle}>
      <PokemonCardHeader id={id} name={name}></PokemonCardHeader>
      <PokemonCardBody types={types}></PokemonCardBody>
    </Card>
  );
};

export default PokemonCard;
