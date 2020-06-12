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
  return (
    <Card style={styles.cardStyle}>
      <PokemonCardHeader {...pokemon}></PokemonCardHeader>
      <PokemonCardBody types={pokemon.types}></PokemonCardBody>
    </Card>
  );
};

export default PokemonCard;
