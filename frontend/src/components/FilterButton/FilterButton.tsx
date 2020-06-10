import React, { FC } from "react";
import { Button } from "@material-ui/core";

type VariantType = "text" | "contained" | "outlined";

type FilterButtonProps = {
  displayText: string;
  value: string;
  variant?: string;
  styles?: any;
  icon?: any;
  clickHandler: (text: string, val: string) => void;
};

const FilterButton: FC<FilterButtonProps> = ({
  displayText,
  value,
  variant,
  styles,
  icon,
  clickHandler,
}: FilterButtonProps) => {
  let spanTextStyle = {};
  if (icon) {
    spanTextStyle = {
      marginRight: "auto",
    };
  }

  return (
    <Button variant={variant as VariantType} style={styles} onClick={() => clickHandler(value, displayText)}>
      {icon && icon()}
      <span style={spanTextStyle}>{displayText}</span>
    </Button>
  );
};

export default FilterButton;
