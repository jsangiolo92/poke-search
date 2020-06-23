import React, { FC, useContext, useState, useEffect } from "react";
import { FiltersContext } from "../../../../../context/FiltersContext";
import { ModalDetailsContext } from "../../../../../context/ModalDetailsContext";
import { CardMedia } from "@material-ui/core";
import { versionTextMap } from "../../../../../data/version-data";
import { learnMethodTextMap } from "../../../../../data/learn-method-data";
import { MoveWithVersionData, VersionData } from "../../../../../types";
import styles from "./styles";

type Props = {
  id: number;
  name: string;
  moves: MoveWithVersionData[];
  types: string[];
};

const PokemonCardHeader: FC<Props> = ({ id, name, moves, types }: Props) => {
  const imageUrl = `${process.env.IMAGE_URL}/${id}.png`;
  const { dispatch: detailsDispatch } = useContext(ModalDetailsContext);

  const handleClick = () => {
    Object.keys(moves).forEach((moveName) => {
      const currentMove: MoveWithVersionData = moves[moveName];
      currentMove.versionData = currentMove.versionData.filter(
        (obj: VersionData) => obj.version !== "xd" && obj.version !== "colosseum",
      );
    });

    const details = { id, name, types, moves: Object.keys(moves).map((key) => moves[key]) };
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
