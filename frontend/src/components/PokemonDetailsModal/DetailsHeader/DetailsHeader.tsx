import React, { FC } from "react";
import { typeIconMap } from "../../../data/icon-links";
import styles from "./styles";

type Props = {
  id: number;
  name: string;
  types: string[];
  formatName: (str: string) => string;
};

const DetailsHeader: FC<Props> = ({ id, name, types, formatName }) => {
  const imageUrl = `${process.env.IMAGE_URL}/${id}.png`;
  return (
    <div style={styles.headerStyles}>
      <div style={styles.infoContainerStyles}>
        <div style={styles.nameStyles}>{formatName(name)}</div>
        <div>{"Number " + id}</div>
        <div style={styles.iconContainerStyles}>
          {types &&
            types.map((t, typeIdx) => {
              return <img key={typeIdx} style={styles.iconStyles} src={typeIconMap[t]} />;
            })}
        </div>
      </div>
      <div>{id && <img style={styles.imageStyles} src={imageUrl} />}</div>
    </div>
  );
};

export default DetailsHeader;
