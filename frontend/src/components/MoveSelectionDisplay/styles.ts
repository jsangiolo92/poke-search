export default {
  containerStyles: {
    display: "flex",
    flexDirection: "row" as "row",
  },

  textStyles: {
    fontFamily: "Roboto",
    padding: "0.5rem",
    margin: "0.5rem 0 0 0",
  },

  selectedMovesContainerStyles: {
    display: "flex",
    flexDirection: "row" as "row",
    flexWrap: "wrap" as "wrap",
  },

  selectedMoveStyles: {
    fontFamily: "Roboto",
    margin: "0.5rem 0.5rem 0.5rem",
    color: "white",
  },

  selectedMoveBackgroundStyles: {
    borderRadius: "15%",
    padding: "0.5rem",
    margin: "0.5rem 0 0 0.5rem",
    minWidth: "6rem",
    height: "1rem",
    display: "flex",
    alignItems: "center",
  },

  selectedMoveButtonStyles: {
    marginLeft: "auto",
    background: "white",
    borderRadius: "50%",
    cursor: "pointer",
  },

  buttonStyles: {
    margin: "0.5rem 0.5rem",
  },
};
