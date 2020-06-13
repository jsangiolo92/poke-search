import React, { FC, useContext, useEffect, useState } from "react";
import { RouteComponentProps } from "@reach/router";
import { PokemonContext } from "../../context/PokemonContext";
import { MovesContext } from "../../context/MovesContext";
import { FiltersContext } from "../../context/FiltersContext";
import ResultsHeader from "./ResultsHeader/ResultsHeader";
import FilterSections from "./FiltersSection/FilterSections";
import PokemonCardList from "./PokemonCardList/PokemonCardList";
import PokemonDetailsModal from "../PokemonDetailsModal/PokemonDetailsModal";
import { Pokemon } from "../../types";

const initialDisplayState = {
  id: 0,
  name: "",
  moves: [],
  types: [],
};

const PokemonResults: FC<RouteComponentProps> = (props: RouteComponentProps) => {
  const { pokemonState } = useContext(PokemonContext);
  const {
    selectedMovesState: { selectedMoves },
  } = useContext(MovesContext);
  const { filtersState: filters, dispatch: filtersDispatch } = useContext(FiltersContext);

  const [displayedPokemon, setDisplayedPokmeon] = useState<Pokemon[]>([initialDisplayState]);

  useEffect(() => runMovesFilter(), [pokemonState, selectedMoves]);

  useEffect(() => {
    console.log("filtered results ==> ", displayedPokemon);
  }, [displayedPokemon]);

  const runMovesFilter = () => {
    if (pokemonState.length && selectedMoves.length) {
      const initialDisplayData = pokemonState.filter((pokemon) => {
        return selectedMoves.every((move) => pokemon.moves.hasOwnProperty(move.name));
      });
      setDisplayedPokmeon(initialDisplayData);
    }

    filtersDispatch({
      type: "CLEAR",
      filters: {
        moves: selectedMoves.map((selectedMove) => selectedMove.name),
      },
    });
  };

  const applyTypeFilter = (pokemonType: string, displayText: string) => {
    const results = displayedPokemon.filter((pokemon) => pokemon.types.includes(pokemonType.toLowerCase()));
    setDisplayedPokmeon(results);
    filtersDispatch({
      type: "UPDATE_FILTERS",
      filters: {
        ...filters,
        pokemonType: displayText,
      },
    });
  };

  const applyVersionFilter = (version: string, displayText: string) => {
    const results = displayedPokemon.filter(({ moves: movesForPokemon }: Pokemon) => {
      return selectedMoves.every(({ name: moveName }) => {
        return movesForPokemon[moveName].versionData.some((versionObj) => versionObj.version === version);
      });
    });
    setDisplayedPokmeon(results);
    filtersDispatch({
      type: "UPDATE_FILTERS",
      filters: {
        ...filters,
        version: displayText,
      },
    });
  };

  const applyLearnMethodFilter = (learnMethod: string, displayText: string) => {
    const results = displayedPokemon.filter(({ moves: movesForPokemon }: Pokemon) => {
      return selectedMoves.every(({ name: moveName }) => {
        return movesForPokemon[moveName].versionData.some((verionObj) => verionObj.learnMethod === learnMethod);
      });
    });
    setDisplayedPokmeon(results);
    filtersDispatch({
      type: "UPDATE_FILTERS",
      filters: {
        ...filters,
        learnMethod: displayText,
      },
    });
  };

  return (
    <>
      <ResultsHeader filters={filters} runMovesFilter={runMovesFilter} />
      <FilterSections
        selectType={applyTypeFilter}
        selectVersion={applyVersionFilter}
        selectLearnMethod={applyLearnMethodFilter}
      />
      <PokemonDetailsModal />
      <PokemonCardList displayedPokemon={displayedPokemon} runMovesFilter={runMovesFilter} />
    </>
  );
};

export default PokemonResults;
