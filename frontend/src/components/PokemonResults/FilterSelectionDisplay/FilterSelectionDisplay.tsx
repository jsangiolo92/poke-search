import React, { FC } from "react";
import { Breadcrumbs } from "@material-ui/core";
import styles from "./styles";

type Props = {
  filters: {
    moves: string[];
    pokemonType: string;
    version: string;
    learnMethod: string;
  };
};

const FilterSelectionDisplay: FC<Props> = ({ filters }: Props) => {
  const { moves, pokemonType, version, learnMethod } = filters;

  return (
    <Breadcrumbs style={styles.textStyle}>
      <span>
        Displaying Pokemon who can learn
        <span>{" " + moves.join(", ")}</span>
      </span>
      {pokemonType && (
        <span>
          and are of type <span>{pokemonType}</span>
        </span>
      )}
      {version && (
        <span>
          in <span>{version}</span> version
        </span>
      )}
      {learnMethod && (
        <span>
          via <span>{learnMethod}</span>
        </span>
      )}
    </Breadcrumbs>
  );
};

export default FilterSelectionDisplay;
