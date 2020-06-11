import React, { FC } from "react";
import { CardMedia } from "@material-ui/core";
import styles from "./styles";

type Props = {
  id: number;
  name: string;
};

const PokemonCardHeader: FC<Props> = ({ id, name }: Props) => {
  const imageUrl = `${process.env.IMAGE_URL}/${id}.png`;
  return (
    <div style={styles.titleContainerStyle}>
      <div style={styles.cardHeaderStyle}>{name}</div>
      <CardMedia image={imageUrl} style={styles.imageStyle}></CardMedia>
    </div>
  );
};

export default PokemonCardHeader;
