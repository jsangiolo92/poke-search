import { getObject } from "./get";

export const getMoves = async (event) => {
  return getObject("moves.json");
};

export const getPokemon = async (event) => {
  const key = `pokemon-${event.pathParameters.id}.json`;
  return getObject(key);
};
