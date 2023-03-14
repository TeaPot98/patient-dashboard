import { PatientType } from "models";
import { NotFoundError } from "utils";

export const getPatientType = async (id: string) => {
  const patientType = await PatientType.findById(id);
  if (!patientType) throw new NotFoundError("Patient type not found");
  return patientType;
};
