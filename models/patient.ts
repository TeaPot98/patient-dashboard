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
  fieldGroups: [
    {
      name: String,
      fields: [
        {
          name: String,
          type: { type: String },
          // TODO: Change later depending on requirements
          content: Object,
        },
      ],
    },
  ],
});

export const Patient = mongoose.model(
  "Patient",
  formatMongoSchema(patientSchema)
);
