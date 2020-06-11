import React, { FC } from "react";
import { Pokemon } from "../../../types";
import BackButton from "../BackButton/BackButton";
import ClearFiltersButton from "../ClearFiltersButton/ClearFiltersButton";
import Loading from "../../Loading/Loading";
import PokemonCard from "../../PokemonCard/PokemonCard";
import styles from "./styles";

type Props = {
  displayedPokemon: Pokemon[];
  runMovesFilter: () => void;
};

const PokemonCardList: FC<Props> = ({ displayedPokemon, runMovesFilter }: Props) => {
  const renderPokemonCards = () => {
    if (displayedPokemon.length === 1 && displayedPokemon[0].id === 0) {
      return <Loading />;
    }

    if (!displayedPokemon.length) {
      return (
        <div style={styles.noResultsContainerStyle}>
          <span>No Results for current Filters</span>
          <BackButton />
          <ClearFiltersButton runMovesFilter={runMovesFilter} />
        </div>
      );
    }

    return (
      <div style={styles.containerStyle}>
        {displayedPokemon.map((pokemon) => (
          <PokemonCard pokemon={pokemon} key={pokemon.id} />
        ))}
      </div>
    );
  };

  return renderPokemonCards();
};

export default PokemonCardList;
