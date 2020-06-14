import React, { FC } from "react";
import { typeColorMap } from "../../../../../data/type-color-map";
import styles from "./styles";

type Props = {
  type: string;
  damageClass: string;
};

const MoveCardBody: FC<Props> = ({ type, damageClass }: Props) => {
  return (
    <div style={styles.cardInfoContainer}>
      <span style={{ ...styles.baseTypeStyle, background: typeColorMap[type] }}>{type.toUpperCase()}</span>
      <span style={{ ...styles.baseTypeStyle, background: typeColorMap[damageClass] }}>
        {damageClass.toUpperCase()}
      </span>
    </div>
  );
};

export default MoveCardBody;
