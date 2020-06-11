import React, { FC, useContext, useEffect, useState } from "react";
import { RouteComponentProps } from "@reach/router";
import { PokemonContext } from "../../context/PokemonContext";
import { MovesContext } from "../../context/MovesContext";
import { Pokemon } from "../../types";
import ResultsHeader from "./ResultsHeader/ResultsHeader";
import FilterSections from "./FiltersSection/FilterSections";
import PokemonCardList from "./PokemonCardList/PokemonCardList";

type FilterState = {
  moves: string[];
  pokemonType: string;
  version: string;
  learnMethod: string;
};

const initialFilterState = {
  moves: [],
  pokemonType: null,
  version: null,
  learnMethod: null,
};

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

  const [displayedPokemon, setDisplayedPokmeon] = useState<Pokemon[]>([initialDisplayState]);
  const [filters, setFilters] = useState<FilterState>(initialFilterState);

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

    setFilters({
      ...initialFilterState,
      moves: selectedMoves.map((selectedMove) => selectedMove.name),
    });
  };

  const applyTypeFilter = (pokemonType: string, displayText: string) => {
    const results = displayedPokemon.filter((pokemon) => pokemon.types.includes(pokemonType.toLowerCase()));
    setDisplayedPokmeon(results);
    setFilters({
      ...filters,
      pokemonType: displayText,
    });
  };

  const applyVersionFilter = (version: string, displayText: string) => {
    const results = displayedPokemon.filter(({ moves: movesForPokemon }: Pokemon) => {
      return selectedMoves.every(({ name: moveName }) => {
        return movesForPokemon[moveName].versionData.some((versionObj) => versionObj.version === version);
      });
    });
    setDisplayedPokmeon(results);
    setFilters({
      ...filters,
      version: displayText,
    });
  };

  const applyLearnMethodFilter = (learnMethod: string, displayText: string) => {
    const results = displayedPokemon.filter(({ moves: movesForPokemon }: Pokemon) => {
      return selectedMoves.every(({ name: moveName }) => {
        return movesForPokemon[moveName].versionData.some((verionObj) => verionObj.learnMethod === learnMethod);
      });
    });
    setDisplayedPokmeon(results);
    setFilters({
      ...filters,
      learnMethod: displayText,
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
      <PokemonCardList displayedPokemon={displayedPokemon} runMovesFilter={runMovesFilter} />
    </>
  );
};

export default PokemonResults;
