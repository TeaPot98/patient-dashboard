import mongoose from "mongoose";

import { formatMongoSchema } from "./utils";

const patientSchema = new mongoose.Schema({
  name: String,
  surname: String,
  birthDate: Date,
  sex: String,
  address: String,
  idnp: String,
  phone: String,
});

export const Patient = mongoose.model(
  "Patient",
  formatMongoSchema(patientSchema)
);
