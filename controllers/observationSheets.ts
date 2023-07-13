import { Router } from "express";
import { ObservationSheet } from "models";
import { Roles } from "types";
import { getLoggedUser, getObservationSheet } from "utils";
import { ForbiddenError } from "utils/errors";

export const observationSheetsRouter = Router();

observationSheetsRouter.post("/", async (req, res, next) => {
  try {
    const payload = req.body;

    const newObservationSheet = new ObservationSheet(payload);
    await newObservationSheet.save();

    res.json(newObservationSheet);
  } catch (err) {
    next(err);
  }
});

observationSheetsRouter.get("/", async (req, res, next) => {
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
    const observationSheet = await ObservationSheet.find(filter);

    // Send the search results back as a JSON response
    res.json(observationSheet);
  } catch (err) {
    next(err);
  }
});

observationSheetsRouter.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const observationSheet = await getObservationSheet(id);

    res.json(observationSheet);
  } catch (err) {
    next(err);
  }
});

observationSheetsRouter.put("/:id", async (req, res, next) => {
  try {
    const { role: userRole } = await getLoggedUser(req);
    const observationSheetId = req.params.id;
    const payload = req.body;

    const oldObservationSheet = await getObservationSheet(observationSheetId);

    if (!(userRole === Roles.ADMIN || userRole === Roles.MODERATOR))
      throw new ForbiddenError();

    const updatedObservationSheet = await oldObservationSheet.updateOne(
      payload
    );

    res.json(updatedObservationSheet);
  } catch (err) {
    next(err);
  }
});

observationSheetsRouter.delete("/:id", async (req, res, next) => {
  try {
    const { role: userRole } = await getLoggedUser(req);
    const observationSheetId = req.params.id;

    const observationSheet = await getObservationSheet(observationSheetId);
    if (!(userRole === Roles.ADMIN || userRole === Roles.MODERATOR))
      throw new ForbiddenError();

    await ObservationSheet.findByIdAndDelete(observationSheet.id);

    res.status(204).end();
  } catch (err) {
    next(err);
  }
});
