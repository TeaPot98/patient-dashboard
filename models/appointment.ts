import mongoose from "mongoose";

import { formatMongoSchema } from "./utils";

const appointmentSchema = new mongoose.Schema({
  patient: { type: mongoose.Types.ObjectId, ref: "Patient" },
  author: {
    name: String,
    surname: String,
    id: String,
  },
  examinationDate: Date,
  acuses: String,
  objectiveExam: String,
  investigationResults: String,
  diagnosis: String,
  recommendations: String,
});

export const Appointment = mongoose.model(
  "Appointment",
  formatMongoSchema(appointmentSchema)
);
