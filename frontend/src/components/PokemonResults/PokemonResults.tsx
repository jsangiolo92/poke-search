import React, { FC, useContext, useEffect, useState } from "react";
import { RouteComponentProps } from "@reach/router";
import { PokemonContext } from "../../context/PokemonContext";
import { MovesContext } from "../../context/MovesContext";
import ResultsHeader from "./ResultsHeader/ResultsHeader";
import FilterSections from "./FiltersSection/FilterSections";
import PokemonCardList from "./PokemonCardList/PokemonCardList";
import PokemonDetailsModal from "../PokemonDetailsModal/PokemonDetailsModal";
import { filterVersionDataByVersion, filterVersionDataByLearnMethod } from "../../filters";
import { Pokemon } from "../../types";

type FilterState = {
  moves: string[];
  pokemonType: string;
  version: string;
  learnMethod: string;
};

const initialDisplayState = {
  id: 0,
  name: "",
  moves: [],
  types: [],
};

const initialFilterState: FilterState = {
  moves: [],
  pokemonType: null,
  version: null,
  learnMethod: null,
};

const PokemonResults: FC<RouteComponentProps> = (props: RouteComponentProps) => {
  const { pokemonState } = useContext(PokemonContext);
  const {
    selectedMovesState: { selectedMoves },
  } = useContext(MovesContext);

  const [displayedPokemon, setDisplayedPokmeon] = useState<Pokemon[]>([initialDisplayState]);
  const [filters, setFilters] = useState<FilterState>(initialFilterState);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("filtered results => ", displayedPokemon);
    }
  }, [displayedPokemon]);

  useEffect(() => runMovesFilter(), [pokemonState, selectedMoves]);

  const runMovesFilter = () => {
    if (pokemonState.length && selectedMoves.length) {
      const initialDisplayData = pokemonState.reduce((arr, pokemon) => {
        if (selectedMoves.every((move) => pokemon.moves.hasOwnProperty(move.name))) {
          const filteredMoves = selectedMoves.reduce((obj, move) => {
            obj[move.name] = { ...pokemon.moves[move.name] };
            return obj;
          }, {});
          arr.push({ ...pokemon, moves: filteredMoves });
        }
        return arr;
      }, []);

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

    filterVersionDataByVersion(results, version);

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

    filterVersionDataByLearnMethod(results, learnMethod);

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
      <PokemonDetailsModal />
      <PokemonCardList displayedPokemon={displayedPokemon} runMovesFilter={runMovesFilter} />
    </>
  );
};

export default PokemonResults;
