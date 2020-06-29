import React from "react";
import { render } from "@testing-library/react";
import Loading from "./Loading";

it("renders the loading tag", () => {
  const { getByText } = render(<Loading />);
  getByText("Loading...");
});
