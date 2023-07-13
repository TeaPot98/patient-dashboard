import { ObservationSheet } from "models";
import { NotFoundError } from "utils";

export const getObservationSheet = async (id: string) => {
  const observationSheet = await ObservationSheet.findById(id);
  if (!observationSheet) throw new NotFoundError("Observation sheet not found");
  return observationSheet;
};
