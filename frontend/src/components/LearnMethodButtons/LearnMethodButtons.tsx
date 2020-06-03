import React, { FC } from "react";
import { Grid } from "@material-ui/core";
import learnMethodButtonData from "../../data/learn-method-data";
import FilterButton from "../FilterButton/FilterButton";

type LearnMethodButtonsProps = {
  selectLearnMethod: (text: string, val: string) => void;
};

const LearnMethodButtons: FC<LearnMethodButtonsProps> = ({ selectLearnMethod }: LearnMethodButtonsProps) => {
  return (
    <>
      <span>Filter by Learn Method</span>
      <Grid container>
        <Grid item>
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
