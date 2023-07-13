import mongoose from "mongoose";

import { formatMongoSchema } from "./utils";

const observationSheetSchema = new mongoose.Schema({
  name: String,
  surname: String,
  idnp: String,
  age: String,
  consultationDate: Date,
  extraFields: Object,
});

export const ObservationSheet = mongoose.model(
  "ObservationSheet",
  formatMongoSchema(observationSheetSchema)
);
