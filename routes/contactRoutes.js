// routes/contactRoutes.js
import express from "express";
import {
  createContact,
  getContacts,
  deleteContact,
} from "../controllers/contactController.js";

const router = express.Router();

// POST - create contact
router.post("/", createContact);

// GET - all contacts
router.get("/", getContacts);

// DELETE - remove contact
router.delete("/:id", deleteContact);

export default router;
