import React, { FC } from "react";
import mappings from "./mappings";
import styles from "./styles";

type Props = {
  entry: string;
};

const VersionLabel: FC<Props> = ({ entry }: Props) => {
  const { text, colors } = mappings[entry];
  return (
    <div>
      <span style={{ ...styles.textStyle, color: colors[0] }}>{text[0]}</span>
      {text.length > 1 && <span>/</span>}
      {text.length > 1 && <span style={{ ...styles.textStyle, color: colors[1] }}>{text[1]}</span>}
    </div>
  );
};

export default VersionLabel;
