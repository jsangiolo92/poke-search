import React, { FC, useContext } from "react";
import { ModalDetailsContext } from "../../context/ModalDetailsContext";
import { Modal, Fade } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DetailsHeader from "./DetailsHeader/DetailsHeader";
import TableHeaders from "./TableHeaders/TableHeaders";
import MovesTable from "./MovesTable/MovesTable";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "40rem",
    height: "35rem",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const PokemonDetailsModal: FC = () => {
  const classes = useStyles();
  const { detailsState, dispatch } = useContext(ModalDetailsContext);
  const { details, open } = detailsState;
  const { id, name, moves, types } = details;

  const handleClose = () => {
    dispatch({
      type: "CLOSE",
    });
  };

  const formatName = (str: string): string => {
    if (!str) {
      return "";
    }

    const chars = str.split("");
    chars[0] = chars[0].toUpperCase();

    const idx = chars.indexOf("-");
    if (idx > -1) {
      chars[idx + 1] = chars[idx + 1].toUpperCase();
    }

    return chars.join("").replace("-", " ");
  };

  function getModalStyle() {
    const top = 50;
    const left = 50;
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
      overflow: "auto",
    };
  }

  return (
    <>
      <Modal open={open} onClose={handleClose} style={{ fontFamily: "Roboto" }}>
        <Fade in={open}>
          <div style={getModalStyle()} className={classes.paper}>
            <DetailsHeader id={id} name={name} types={types} formatName={formatName} />
            <TableHeaders />
            <MovesTable moves={moves} formatName={formatName} />
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default PokemonDetailsModal;
