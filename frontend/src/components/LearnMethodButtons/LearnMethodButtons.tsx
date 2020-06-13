import React, { FC } from "react";
import { Grid } from "@material-ui/core";
import { learnMethodButtonData } from "../../data/learn-method-data";
import FilterButton from "../FilterButton/FilterButton";
import styles from "./styles";

type Props = {
  selectLearnMethod: (text: string, val: string) => void;
};

const LearnMethodButtons: FC<Props> = ({ selectLearnMethod }: Props) => {
  return (
    <>
      <span style={styles.headerStyles}>Filter by Learn Method</span>
      <Grid container style={{ margin: "0.5rem 0 0 0" }}>
        <Grid item xs={12}>
          {learnMethodButtonData.map((data, index) => {
            const props = { ...data, clickHandler: selectLearnMethod };
            return <FilterButton key={index} {...props} />;
          })}
        </Grid>
      </Grid>
    </>
  );
};

export default LearnMethodButtons;
