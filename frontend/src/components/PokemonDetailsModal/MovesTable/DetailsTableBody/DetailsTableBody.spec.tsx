import React from "react";
import { render } from "@testing-library/react";
import DetailsTableBody from "./DetailsTableBody";

const props = {
  versionEntries: [
    { learnMethod: "machine", version: "red-blue" },
    { learnMethod: "machine", version: "gold-silver" },
  ],
};

it("renders the version data from props", () => {
  const { getByText } = render(<DetailsTableBody {...props} />);
  getByText("R");
  getByText("B");
  getByText("G");
  getByText("S");
});
