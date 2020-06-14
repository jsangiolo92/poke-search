import React, { FC, useState, useEffect, useContext } from "react";
import MoveCard from "./MoveCard/MoveCard";
import { MovesContext } from "../../../context/MovesContext";
import { SearchContext } from "../../../context/SearchContext";
import Loading from "../../Loading/Loading";
import { Move } from "../../../types";
import styles from "./styles";

const MovesList: FC = () => {
  const {
    selectedMovesState: { selectedMoves, allMoves },
    dispatch,
  } = useContext(MovesContext);

  const { searchState, dispatch: searchDispatch } = useContext(SearchContext);

  const [rowLimit, setRowLimit] = useState<number>(24);
  const [filteredMoves, setFilteredMoves] = useState<Move[]>([]);
  const [displayedMoves, setDisplayedMoves] = useState<Move[]>([]);

  window.onscroll = () => {
    const diff = document.documentElement.offsetHeight - document.documentElement.scrollTop - window.innerHeight;
    if (diff <= 1) {
      setRowLimit(rowLimit + 4);
    }
  };

  const updateSearchResults = () => {
    setRowLimit(24);
    const searchResults = allMoves.filter((m) => m.name.includes(searchState.toLowerCase()));
    setFilteredMoves(searchResults);
  };

  useEffect(() => {
    if (!allMoves.length) {
      fetch(`${process.env.URL}/moves`)
        .then((response) => response.json())
        .then(({ moves }) => {
          const movesArray = Object.keys(moves).map((key) => moves[key]);
          setFilteredMoves(movesArray);
          dispatch({
            type: "LOAD_ALL_MOVES",
            allMoves: movesArray,
          });
        });
    }

    searchDispatch({
      type: "UPDATE",
      input: "",
    });

    return () => {
      window.onscroll = null;
    };
  }, []);

  useEffect(updateSearchResults, [searchState]);

  useEffect(() => {
    setDisplayedMoves(filteredMoves.slice(0, rowLimit));
  }, [rowLimit, filteredMoves]);

  return (
    <>
      <div style={styles.containerStyle}>
        {!!displayedMoves.length &&
          displayedMoves.map((m) => {
            const selected = selectedMoves.some((selectedMove: Move) => selectedMove.id === m.id);
            return <MoveCard key={m.id} moveData={m} selected={selected}></MoveCard>;
          })}
      </div>
      {allMoves && !allMoves.length && <Loading />}
    </>
  );
};

export default MovesList;
