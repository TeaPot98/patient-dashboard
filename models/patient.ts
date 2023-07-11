import mongoose from "mongoose";

import { formatMongoSchema } from "./utils";

const patientSchema = new mongoose.Schema({
  name: String,
  surname: String,
  idnp: String,
  birthDate: Date,
  consultationDate: Date,
  acuses: String,
  neurologicalStatus: String,
  diagnosis: String,
  treatment: String,
});

export const Patient = mongoose.model(
  "Patient",
  formatMongoSchema(patientSchema)
);
