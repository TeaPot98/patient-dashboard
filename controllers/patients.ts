import { Router } from "express";
import { Patient } from "models";
import { Roles } from "types";
import { getLoggedUser, getPatient } from "utils";
import { ForbiddenError } from "utils/errors";

export const patientsRouter = Router();

patientsRouter.post("/", async (req, res, next) => {
  try {
    const payload = req.body;

    const newPatient = new Patient(payload);
    await newPatient.save();

    res.json(newPatient);
  } catch (err) {
    next(err);
  }
});

patientsRouter.get("/", async (req, res, next) => {
  try {
    // Extract search query parameter from the request query string
    const { search } = req.query;

    // Build the filter object based on the search query
    const filter = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { surname: { $regex: search, $options: "i" } },
            { idnp: search },
          ],
        }
      : {};

    // Search for patients with the given filter
    const patients = await Patient.find(filter).sort({
      consultationDate: -1,
      idnp: -1,
    });

    // Send the search results back as a JSON response
    res.json(patients);
  } catch (err) {
    next(err);
  }
});

patientsRouter.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const patient = await getPatient(id);

    res.json(patient);
  } catch (err) {
    next(err);
  }
});

patientsRouter.put("/:id", async (req, res, next) => {
  try {
    const { role: userRole, id: userId } = await getLoggedUser(req);
    const patientId = req.params.id;
    const payload = req.body;

    const oldPatient = await getPatient(patientId);

    if (
      !(userRole === Roles.ADMIN || userRole === Roles.MODERATOR) &&
      oldPatient.author.id !== userId
    )
      throw new ForbiddenError();

    const updatedPatient = await oldPatient.updateOne(payload);

    res.json(updatedPatient);
  } catch (err) {
    next(err);
  }
});

patientsRouter.delete("/:id", async (req, res, next) => {
  try {
    const { role: userRole, id: userId } = await getLoggedUser(req);
    const patientId = req.params.id;

    const patient = await getPatient(patientId);
    if (
      !(userRole === Roles.ADMIN || userRole === Roles.MODERATOR) &&
      patient.author.id !== userId
    )
      throw new ForbiddenError();

    await Patient.findByIdAndDelete(patient.id);

    res.status(204).end();
  } catch (err) {
    next(err);
  }
});
