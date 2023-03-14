import mongoose from "mongoose";

import { formatMongoSchema } from "./utils";

const patientSchema = new mongoose.Schema({
  name: String,
  surname: String,
  author: {
    name: String,
    surname: String,
    id: String,
  },
  birthDate: Date,
  sex: String,
  address: String,
  idnp: Number,
  phone: Number,
  examinationDate: Date,
  acuses: String,
  objectiveExam: String,
  investigationResults: String,
  diagnosis: String,
  recommendations: String,
});

export const Patient = mongoose.model(
  "Patient",
  formatMongoSchema(patientSchema)
);
