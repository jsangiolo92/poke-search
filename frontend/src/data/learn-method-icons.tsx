import React from "react";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import SaveIcon from "@material-ui/icons/Save";
import SchoolIcon from "@material-ui/icons/School";
import ChildFriendlyIcon from "@material-ui/icons/ChildFriendly";

export const returnArrowIcon = () => {
  return (
    <span style={{ marginRight: "auto" }}>
      <ArrowUpwardIcon></ArrowUpwardIcon>
    </span>
  );
};

export const returnSaveIcon = () => {
  return (
    <span style={{ marginRight: "auto" }}>
      <SaveIcon></SaveIcon>
    </span>
  );
};

export const returnChildIcon = () => {
  return (
    <span style={{ marginRight: "auto" }}>
      <ChildFriendlyIcon></ChildFriendlyIcon>
    </span>
  );
};

export const returnSchoolIcon = () => {
  return (
    <span style={{ marginRight: "auto" }}>
      <SchoolIcon></SchoolIcon>
    </span>
  );
};
