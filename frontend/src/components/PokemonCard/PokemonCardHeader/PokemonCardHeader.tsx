import React, { FC, useContext, useState, useEffect } from "react";
import { FiltersContext } from "../../../context/FiltersContext";
import { ModalDetailsContext } from "../../../context/ModalDetailsContext";
import { CardMedia } from "@material-ui/core";
import { versionTextMap } from "../../../data/version-data";
import { learnMethodTextMap } from "../../../data/learn-method-data";
import { MoveWithVersionData, VersionData } from "../../../types";
import styles from "./styles";

type Props = {
  id: number;
  name: string;
  moves: MoveWithVersionData[];
  types: string[];
};

const PokemonCardHeader: FC<Props> = ({ id, name, moves, types }: Props) => {
  const imageUrl = `${process.env.IMAGE_URL}/${id}.png`;
  const { filtersState: filters } = useContext(FiltersContext);
  const { dispatch: detailsDispatch } = useContext(ModalDetailsContext);

  const handleClick = () => {
    let filteredMoves;
    const details = { id, name, types, moves: [] };
    const movesForPokemon = moves;

    if (filters.moves) {
      filteredMoves = Object.keys(movesForPokemon).reduce((arr, key) => {
        const m: MoveWithVersionData = movesForPokemon[key];
        if (filters.moves.includes(m.name)) {
          arr.push({ ...m });
        }
        return arr;
      }, []);
    }

    if (filters.version) {
      filteredMoves.forEach((move: MoveWithVersionData) => {
        const targetVersion = versionTextMap[filters.version];
        move.versionData = move.versionData.filter((obj: VersionData) => obj.version === targetVersion);
      });
    }

    if (filters.learnMethod) {
      filteredMoves.forEach((move: MoveWithVersionData) => {
        const targetMethod = learnMethodTextMap[filters.learnMethod];
        move.versionData = move.versionData.filter((obj: VersionData) => obj.learnMethod === targetMethod);
      });
    }

    details.moves = filteredMoves;
    detailsDispatch({
      type: "OPEN",
      details,
    });
  };

  return (
    <div style={styles.titleContainerStyle} onClick={handleClick}>
      <div style={styles.cardHeaderStyle}>{name}</div>
      <CardMedia image={imageUrl} style={styles.imageStyle}></CardMedia>
    </div>
  );
};

export default PokemonCardHeader;
