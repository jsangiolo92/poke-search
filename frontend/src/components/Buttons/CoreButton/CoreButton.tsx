import React, { FC } from "react";
import { Button } from "@material-ui/core";

type VariantType = "text" | "contained" | "outlined";
type ColorType = "primary" | "secondary";

type Props = {
  handleClick: () => void;
  text: string;
  disabled?: boolean;
  color: string;
  variant: string;
  styles?: any;
};

const CoreButton: FC<Props> = ({ handleClick, text, disabled, color, variant, styles }: Props) => {
  const click = () => {
    if (handleClick) {
      handleClick();
    }
  };

  return (
    <Button
      disabled={!!disabled}
      variant={variant as VariantType}
      color={color as ColorType}
      onClick={click}
      style={styles}
    >
      {text}
    </Button>
  );
};

export default CoreButton;
