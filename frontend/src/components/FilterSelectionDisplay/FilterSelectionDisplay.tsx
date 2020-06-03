import React, { FC, useState, useEffect } from "react";
import { Breadcrumbs } from "@material-ui/core";

type FilterSelectionDisplayProps = {
  filters: {
    moves: string[];
    pokemonType: string;
    version: string;
    learnMethod: string;
  };
};

const textStyle = {
  fontWeight: "bold" as "bold",
};

const FilterSelectionDisplay: FC<FilterSelectionDisplayProps> = ({ filters }: FilterSelectionDisplayProps) => {
  const { moves, pokemonType, version, learnMethod } = filters;

  return (
    <Breadcrumbs style={textStyle}>
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
