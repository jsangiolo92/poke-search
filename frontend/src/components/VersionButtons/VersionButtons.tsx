import React, { FC } from "react";
import { Grid } from "@material-ui/core";
import FilterButton from "../FilterButton/FilterButton";
import verionButtonData from "../../data/version-data";

type VersionButtonsProps = {
  selectVersion: (text: string, val: string) => void;
};

const VersionButtons: FC<VersionButtonsProps> = ({ selectVersion }: VersionButtonsProps) => {
  return (
    <>
      <span>Filter by Game Version</span>
      <Grid container>
        {verionButtonData.map((data, index) => {
          const props = { ...data, clickHandler: selectVersion };
          if (index % 4 === 0) {
            return (
              <Grid item key={index}>
                <FilterButton {...props}></FilterButton>
              </Grid>
            );
          } else {
            return <FilterButton key={index} {...props}></FilterButton>;
          }
        })}
      </Grid>
    </>
  );
};

export default VersionButtons;
