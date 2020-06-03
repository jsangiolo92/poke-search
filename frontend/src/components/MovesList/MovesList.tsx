import React, { FC, useState, useEffect, useContext } from "react";
import MoveCard from "../MoveCard/MoveCard";
import { SelectedMovesContext } from "../../context/SelectedMovesContext";
import { TextField } from "@material-ui/core";
import Loading from "../Loading/Loading";

const containerStyle = {
  display: "flex",
  flexWrap: "wrap" as "wrap",
};

const inputStyle = {
  margin: "0.5rem 0 0 0 ",
};

type Move = {
  id: number;
  name: string;
  type: string;
  damageClass: string;
};

const MovesList: FC = () => {
  const { selectedMovesState } = useContext(SelectedMovesContext);

  const [allMoves, setAllMoves]: [Move[], any] = useState([]);
  const [rowLimit, setRowLimit] = useState(24);

  window.onscroll = () => {
    const diff = document.documentElement.offsetHeight - document.documentElement.scrollTop - window.innerHeight;
    if (diff <= 0) {
      setRowLimit(rowLimit + 4);
    }
  };

  useEffect(() => {
    fetch(`${process.env.URL}/moves`)
      .then((response) => response.json())
      .then(({ moves }) => {
        const movesArray = Object.keys(moves).map((key) => moves[key]);
        setAllMoves(movesArray);
        setFilteredMoves(movesArray);
      });

    return () => {
      window.onscroll = null;
    };
  }, []);

  useEffect(() => {
    console.log({ allMoves });
  }, [allMoves]);

  ///// INPUT/SEARCH CODE BELOW

  const [input, setInput] = useState("");
  const [filteredMoves, setFilteredMoves] = useState([]);
  const [displayedMoves, setDisplayedMoves] = useState([]);

  const updateSearchResults = () => {
    console.log("running updateSearchResults");
    setRowLimit(24);
    const searchResults = allMoves.filter((m) => m.name.includes(input));
    setFilteredMoves(searchResults);
  };

  useEffect(updateSearchResults, [input]);

  useEffect(() => {
    setDisplayedMoves(filteredMoves.slice(0, rowLimit));
  }, [rowLimit, filteredMoves]);

  const onChange = (val) => {
    setInput(val);
  };

  return (
    <>
      <TextField
        value={input}
        placeholder={"Search for a move"}
        onChange={(e) => onChange(e.target.value)}
        variant="outlined"
        fullWidth
        style={inputStyle}
      ></TextField>
      <div style={containerStyle}>
        {!!displayedMoves.length &&
          displayedMoves.map((m) => {
            const selected = selectedMovesState.some((selectedMove: Move) => selectedMove.id === m.id);
            return <MoveCard key={m.id} moveData={m} selected={selected}></MoveCard>;
          })}
      </div>
      {!allMoves.length && <Loading />}
    </>
  );
};

export default MovesList;
