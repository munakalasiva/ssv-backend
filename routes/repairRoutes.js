import express from "express";
import {
  createRepair,
  updateRepair,
  deleteRepair,
  checkWarranty,
  getAllRepairs
} from "../controllers/repairController.js";

const router = express.Router();

router.post("/repair", createRepair);
router.put("/repair/:id", updateRepair);
router.delete("/repair/:id", deleteRepair);
router.get("/repairs", getAllRepairs);

router.get("/:id", checkWarranty);

export default router;
