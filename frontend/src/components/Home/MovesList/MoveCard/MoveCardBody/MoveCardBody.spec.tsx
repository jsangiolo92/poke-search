import React from "react";
import { render } from "@testing-library/react";
import MoveCardBody from "./MoveCardBody";

const props = {
  type: "normal",
  damageClass: "physical",
};

it("renders the type and damageClass from props", () => {
  const { getByText } = render(<MoveCardBody {...props} />);
  getByText("NORMAL");
  getByText("PHYSICAL");
});
