import React, { FC } from "react";
import { Grid } from "@material-ui/core";
import FilterButton from "../FilterButton/FilterButton";
import typeButtonData from "../../data/type-data";

type TypeButtonsProps = {
  selectType: (text: string, val: string) => void;
};

const TypeButtons: FC<TypeButtonsProps> = ({ selectType }: TypeButtonsProps) => {
  return (
    <>
      <span>Filter by Pokemon Type</span>
      <Grid container>
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
    </>
  );
};

export default TypeButtons;
