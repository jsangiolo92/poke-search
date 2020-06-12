import React, { FC, useContext } from "react";
import { ModalDetailsContext } from "../../context/ModalDetailsContext";
import { Modal, Fade, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "25rem",
    height: "25rem",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const PokemonDetails: FC = () => {
  const classes = useStyles();
  const { detailsState, dispatch } = useContext(ModalDetailsContext);

  console.log("detailsState: ", detailsState);
  const { details, open } = detailsState;
  console.log("details are: ", details);

  const handleClose = () => {
    dispatch({
      type: "CLOSE",
    });
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
      <Modal open={open} onClose={handleClose}>
        <Fade in={open}>
          <div style={getModalStyle()} className={classes.paper}>
            <div>{details.name}</div>
            {details.moves &&
              details.moves.map((move, moveIdx) => {
                return (
                  <Grid container key={moveIdx}>
                    <Grid item>{move.name}</Grid>
                    <Grid container>
                      {move.versionData.map((obj, objIdx) => {
                        return (
                          <Grid item key={objIdx} xs={12} style={{ margin: "0 0 0 2rem" }}>
                            {obj.version}
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Grid>
                );
              })}
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default PokemonDetails;
