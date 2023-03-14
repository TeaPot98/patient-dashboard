import { Router } from "express";
import { PatientType } from "models";
import { Roles } from "types";
import { ForbiddenError, getLoggedUser } from "utils";
import { getPatientType } from "utils/get-patient-type";

export const patientTypesRouter = Router();

patientTypesRouter.post("/", async (req, res, next) => {
  try {
    const patientType = req.body;
    const newPatientType = new PatientType(patientType);
    await newPatientType.save();

    res.json(newPatientType);
  } catch (err) {
    next(err);
  }
});

patientTypesRouter.get("/", async (req, res, next) => {
  try {
    const patientTypes = await PatientType.find();
    res.json(patientTypes);
  } catch (err) {
    next(err);
  }
});

patientTypesRouter.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const patientType = await getPatientType(id);
    res.json(patientType);
  } catch (err) {
    next(err);
  }
});

patientTypesRouter.put("/:id", async (req, res, next) => {
  try {
    const { id: userId, role: userRole } = await getLoggedUser(req);
    const patientTypeId = req.params.id;
    const payload = req.body;

    const oldPatientType = await getPatientType(patientTypeId);
    if (
      !(userRole === Roles.ADMIN || userRole === Roles.MODERATOR) &&
      oldPatientType.author.id !== userId
    )
      throw new ForbiddenError();

    const updatedPatientType = await oldPatientType.update(payload);

    res.json(updatedPatientType);
  } catch (err) {
    next(err);
  }
});

patientTypesRouter.delete("/:id", async (req, res, next) => {
  try {
    const { id: userId, role: userRole } = await getLoggedUser(req);
    const patientTypeId = req.params.id;

    const patientType = await getPatientType(patientTypeId);
    if (
      !(userRole === Roles.ADMIN || userRole === Roles.MODERATOR) &&
      patientType.author.id !== userId
    )
      throw new ForbiddenError();

    await PatientType.deleteOne({ _id: patientTypeId });

    res.status(204).end();
  } catch (err) {
    next(err);
  }
});
