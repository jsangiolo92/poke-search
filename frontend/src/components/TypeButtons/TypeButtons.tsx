import React, { FC } from "react";
import { Grid } from "@material-ui/core";
import FilterButton from "../FilterButton/FilterButton";
import typeButtonData from "../../data/type-data";

type TypeButtonsProps = {
  selectType: (text: string, val: string) => void;
};

const headerStyles = {
  fontFamily: "Roboto",
  color: "#3f51b5",
  padding: "0.5rem",
};

const TypeButtons: FC<TypeButtonsProps> = ({ selectType }: TypeButtonsProps) => {
  return (
    <div>
      <span style={headerStyles}>Filter by Pokemon Type</span>
      <Grid container style={{ margin: "0.5rem 0 0 0" }}>
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
