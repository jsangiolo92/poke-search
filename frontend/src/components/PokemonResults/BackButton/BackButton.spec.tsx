import React from "react";
import { render } from "@testing-library/react";
import BackButton from "./BackButton";

it("renders the button", () => {
  const { getByText } = render(<BackButton />);
  getByText("Back to Search");
});
