export type DuplicatedReferences = { [key: string]: number };
export type InvalidRecords = {
  [key: number]: {
    startBalance: number;
    mutation: number;
    endBalance: number;
  };
};

export type ValidationResponse = {
  duplicatedReferences: DuplicatedReferences;
  invalidRecords: InvalidRecords;
  errors: string[];
};
