import React, { FC, useContext } from "react";
import { ModalDetailsContext } from "../../context/ModalDetailsContext";
import { Modal, Fade, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import VersionLabel from "./VersionLabel/VersionLabel";
import { typeIconMap } from "../../data/icon-links";
import styles from "./styles";

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

const PokemonDetails: FC = () => {
  const classes = useStyles();
  const { detailsState, dispatch } = useContext(ModalDetailsContext);

  const { details, open } = detailsState;
  const imageUrl = `${process.env.IMAGE_URL}/${details.id}.png`;
  console.log("details are: ", details);

  const handleClose = () => {
    dispatch({
      type: "CLOSE",
    });
  };

  const formatName = (str: string) => {
    if (!str) {
      return;
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
            <div style={styles.headerStyles}>
              <div style={styles.infoContainerStyles}>
                <div style={styles.nameStyles}>{formatName(details.name)}</div>
                <div>{"Number " + details.id}</div>
                <div style={styles.iconContainerStyles}>
                  {details.types &&
                    details.types.map((t, typeIdx) => {
                      return <img style={styles.iconStyles} src={typeIconMap[t]} />;
                    })}
                </div>
              </div>
              <div>
                <img style={styles.imageStyles} src={imageUrl}></img>
              </div>
            </div>
            <Grid container>
              <Grid item xs={3} style={styles.labelStyles}>
                Move
              </Grid>
              <Grid item xs={3} style={styles.labelStyles}>
                Version
              </Grid>
              <Grid item xs={3} style={styles.labelStyles}>
                Method
              </Grid>
              <Grid item xs={3} style={styles.labelStyles}>
                Level
              </Grid>
            </Grid>
            {details.moves &&
              details.moves.map((move, moveIdx) => {
                return (
                  <Grid container key={moveIdx}>
                    <Grid item style={styles.moveNameStyles}>
                      {formatName(move.name)}
                    </Grid>
                    {move.versionData.map((obj, objIdx) => {
                      const background = objIdx % 2 === 1 ? "#EEEEEE" : "";
                      return (
                        <Grid container style={{ ...styles.movesEntryStyles, background }}>
                          <Grid item xs={3}></Grid>
                          <Grid item xs={3} key={objIdx}>
                            <VersionLabel entry={obj.version} />
                          </Grid>
                          <Grid item xs={3}>
                            {obj.learnMethod}
                          </Grid>
                          {obj.level && <Grid>{obj.level}</Grid>}
                        </Grid>
                      );
                    })}
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
