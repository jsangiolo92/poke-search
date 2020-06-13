import React, { FC } from "react";
import { Grid } from "@material-ui/core";
import FilterButton from "../FilterButton/FilterButton";
import typeButtonData from "../../data/type-data";
import styles from "./styles";

type Props = {
  selectType: (text: string, val: string) => void;
};

const TypeButtons: FC<Props> = ({ selectType }: Props) => {
  return (
    <div>
      <span style={styles.headerStyles}>Filter by Pokemon Type</span>
      <Grid container style={styles.containerStyles}>
        {typeButtonData.map((data, index) => {
          const props = { ...data, clickHandler: selectType };
          if (index % 3 === 0) {
            return (
              <Grid item key={index}>
                <FilterButton {...props} />
              </Grid>
            );
          } else {
            return <FilterButton key={index} {...props} />;
          }
        })}
      </Grid>
    </div>
  );
};

export default TypeButtons;
