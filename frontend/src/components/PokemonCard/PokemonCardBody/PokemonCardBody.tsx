import React, { FC } from "react";
import { typeColorMap } from "../../../data/type-color-map";
import styles from "./styles";

type Props = {
  types: string[];
};

const PokemonCardBody: FC<Props> = ({ types }: Props) => {
  return (
    <div style={styles.typesContainerStyle}>
      {types.map((t, index) => (
        <span key={index} style={{ ...styles.baseTypeStyle, background: typeColorMap[t] }}>
          {t.toUpperCase()}
        </span>
      ))}
    </div>
  );
};

export default PokemonCardBody;
