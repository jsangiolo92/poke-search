import React, { FC, Children } from "react";
import { Button } from "@material-ui/core";

type VariantType = "text" | "contained" | "outlined";

type FilterButtonProps = {
  displayText: string;
  value: string;
  variant?: string;
  styles?: any;
  clickHandler: (text: string, val: string) => void;
};

const FilterButton: FC<FilterButtonProps> = ({
  displayText,
  value,
  variant,
  styles,
  clickHandler,
}: FilterButtonProps) => {
  return (
    <Button variant={variant as VariantType} style={styles} onClick={() => clickHandler(value, displayText)}>
      {displayText}
    </Button>
  );
};

export default FilterButton;
