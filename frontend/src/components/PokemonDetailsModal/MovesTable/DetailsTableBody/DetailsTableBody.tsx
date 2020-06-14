import React, { FC } from "react";
import TableEntry from "./TableEntry/TableEntry";
import { VersionData } from "../../../../types";

type Props = {
  versionEntries: VersionData[];
};

const DetailsTableBody: FC<Props> = ({ versionEntries }: Props) => {
  return (
    <>
      {versionEntries.map((obj, objIdx) => {
        return <TableEntry key={objIdx} data={obj} idx={objIdx} />;
      })}
    </>
  );
};

export default DetailsTableBody;
