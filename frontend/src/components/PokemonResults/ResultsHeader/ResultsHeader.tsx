import React, { FC } from "react";
import FilterSelectionDisplay from "../FilterSelectionDisplay/FilterSelectionDisplay";
import BackButton from "../BackButton/BackButton";
import ClearFiltersButton from "../ClearFiltersButton/ClearFiltersButton";
import styles from "./styles";

type Props = {
  filters: {
    moves: string[];
    pokemonType: string;
    version: string;
    learnMethod: string;
  };
  runMovesFilter: () => void;
};

const ResultsHeader: FC<Props> = ({ filters, runMovesFilter }: Props) => {
  const renderClearFiltersButton = () => {
    if (filters.pokemonType || filters.version || filters.learnMethod) {
      return <ClearFiltersButton runMovesFilter={runMovesFilter} />;
    }
    return null;
  };

  return (
    <div style={styles.containerStyle}>
      <BackButton />
      <FilterSelectionDisplay filters={filters} />
      {renderClearFiltersButton()}
    </div>
  );
};

export default ResultsHeader;
