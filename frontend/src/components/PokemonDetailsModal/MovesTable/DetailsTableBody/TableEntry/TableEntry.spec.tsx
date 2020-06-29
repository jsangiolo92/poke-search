import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import TableEntry from "./TableEntry";

const props = {
  data: { learnMethod: "machine", version: "red-blue" },
  idx: 1,
};

it("renders the version data from props", () => {
  const { getByText, queryByText } = render(<TableEntry {...props} />);
  getByText(props.data.learnMethod);
  expect(queryByText("15")).not.toBeInTheDocument();
});

it("renders the level when one is provided", () => {
  const p = { ...props, data: { ...props.data, learnMethod: "level-up", level: "15" } } as any;
  const { getByText } = render(<TableEntry {...p} />);
  getByText(p.data.learnMethod);
  getByText(p.data.level);
});
