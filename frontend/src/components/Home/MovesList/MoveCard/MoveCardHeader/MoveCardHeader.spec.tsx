import React from "react";
import { render } from "@testing-library/react";
import MoveCardHeader from "./MoveCardHeader";

const props = {
  name: "pound",
  type: "normal",
};

it("renders the name from props", () => {
  const { getByText } = render(<MoveCardHeader {...props} />);
  getByText("pound");
});
