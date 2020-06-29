import React from "react";
import { render } from "@testing-library/react";
import TableHeaders from "./TableHeaders";

it("renders the headers", () => {
  const { getByText } = render(<TableHeaders />);
  getByText("Move");
  getByText("Version");
  getByText("Method");
  getByText("Level");
});
