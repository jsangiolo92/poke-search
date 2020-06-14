import React, { FC } from "react";
import { Grid } from "@material-ui/core";
import TypeButtons from "../../Buttons/TypeButtons/TypeButtons";
import VersionButtons from "../../Buttons/VersionButtons/VersionButtons";
import LearnMethodButtons from "../../Buttons/LearnMethodButtons/LearnMethodButtons";

type Props = {
  selectType: (text: string, val: string) => void;
  selectVersion: (text: string, val: string) => void;
  selectLearnMethod: (text: string, val: string) => void;
};

const FilterSections: FC<Props> = ({ selectType, selectVersion, selectLearnMethod }: Props) => {
  return (
    <Grid container>
      <Grid item xs={3}>
        <TypeButtons selectType={selectType} />
      </Grid>
      <Grid item xs={6}>
        <VersionButtons selectVersion={selectVersion} />
      </Grid>
      <Grid item xs={2}>
        <LearnMethodButtons selectLearnMethod={selectLearnMethod} />
      </Grid>
    </Grid>
  );
};

export default FilterSections;
