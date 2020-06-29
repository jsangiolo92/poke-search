import React from "react";
import { render } from "@testing-library/react";
import VersionLabel from "./VersionLabel";

const props = {
  entry: "gold-silver",
};

it("looks up the text to render from the mappings map using the entry prop", () => {
  const { getByText } = render(<VersionLabel {...props} />);
  getByText("G");
  getByText("/");
  getByText("S");
});
