import React, { FC, useContext } from "react";
import { SearchContext } from "../../../context/SearchContext";
import { TextField } from "@material-ui/core";
import styles from "./styles";

const MoveSearchBar: FC = () => {
  const { searchState, dispatch } = useContext(SearchContext);

  const handleChange = (val) => {
    dispatch({
      type: "UPDATE",
      input: val,
    });
  };

  return (
    <TextField
      value={searchState}
      placeholder={"Search for a move"}
      onChange={(e) => handleChange(e.target.value)}
      variant="outlined"
      fullWidth
      style={styles.inputStyle}
    ></TextField>
  );
};

export default MoveSearchBar;
