import { Patient } from "models";
import { NotFoundError } from "utils";

export const getPatient = async (id: string) => {
  const patient = await Patient.findById(id);
  if (!patient) throw new NotFoundError("Patient not found");
  return patient;
};
