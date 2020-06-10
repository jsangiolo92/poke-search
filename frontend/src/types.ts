export interface Move {
  id: number;
  name: string;
  type: string;
  damageClass: string;
}

type VersionData = {
  learnMethod: string;
  version: string;
};

export interface MoveWithVersionData extends Move {
  versionData: VersionData[];
}

export type Pokemon = {
  id: number;
  name: string;
  moves: MoveWithVersionData[];
  types: string[];
};
