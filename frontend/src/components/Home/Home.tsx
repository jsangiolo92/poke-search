import React, { FC, useEffect, useContext } from "react";
import { RouteComponentProps } from "@reach/router";
import { PokemonContext } from "../../context/PokemonContext";
import MovesList from "./MovesList/MovesList";
import MoveSelectionDisplay from "./MoveSelectionDisplay/MoveSelectionDisplay";
import MoveSearchBar from "./MoveSearchBar/MoveSearchBar";

const Home: FC<RouteComponentProps> = (props: RouteComponentProps) => {
  const { pokemonState, dispatch } = useContext(PokemonContext);

  const expressFetchPokemon = () => {
    if (!pokemonState.length) {
      fetch(`${process.env.URL}/pokemon`)
        .then((response) => response.json())
        .then(({ pokemon }) => {
          const pokemonArray = Object.keys(pokemon).map((p) => pokemon[p]);

          dispatch({
            type: "UPDATE_POKEMON",
            pokemon: pokemonArray,
          });
        })
        .catch(console.error);
    }
  };

  const serverlessFetchPokemon = () => {
    const pages = [1, 2, 3, 4, 5, 6, 7];
    if (!pokemonState.length) {
      Promise.all(pages.map((idx) => fetch(`${process.env.URL}/pokemon/${idx}`)))
        .then((responses) => Promise.all(responses.map((res) => res.json())))
        .then((buckets) => {
          const pokemonArray = buckets.reduce((agg, bucket) => {
            return agg.concat(Object.keys(bucket).map((pokemon) => bucket[pokemon]));
          }, []);

          dispatch({
            type: "UPDATE_POKEMON",
            pokemon: pokemonArray,
          });
        })
        .catch(console.error);
    }
  };

  const fetchPokemon = process.env.NODE_ENV === "production" ? serverlessFetchPokemon : expressFetchPokemon;

  useEffect(fetchPokemon, []);

  return (
    <>
      <MoveSelectionDisplay />
      <MoveSearchBar />
      <MovesList />
    </>
  );
};

export default Home;
