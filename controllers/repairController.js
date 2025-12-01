import Repair from "../models/Repair.js";

// -----------------------------
// Helper Functions
// -----------------------------
function generateWarrantyId() {
  return "WRN-" + Math.floor(100000 + Math.random() * 900000);
}

function calculateWarrantyEnd(start, value, unit) {
  const end = new Date(start);

  if (unit === "months") {
    end.setMonth(end.getMonth() + Number(value));
  } else if (unit === "years") {
    end.setFullYear(end.getFullYear() + Number(value));
  }

  return end;
}

// -----------------------------
// CREATE REPAIR + WARRANTY
// -----------------------------
export const createRepair = async (req, res) => {
  try {
    const {
      customerName,
      phone,
      tvBrand,
      partName,
      warrantyNumber,
      warrantyUnit
    } = req.body;

    const warrantyId = generateWarrantyId();
    const warrantyStartDate = new Date();
    const warrantyEndDate = calculateWarrantyEnd(
      warrantyStartDate,
      warrantyNumber,
      warrantyUnit
    );

    const repair = await Repair.create({
      customerName,
      phone,
      tvBrand,
      partName,
      warrantyNumber,
      warrantyUnit,
      warrantyStartDate,
      warrantyEndDate,
      warrantyId,
      serviceDate: new Date()
    });

    res.json({
      success: true,
      message: "Repair saved and warranty created",
      warrantyId,
      repair
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
};

// -----------------------------
// CHECK WARRANTY STATUS
// -----------------------------
export const checkWarranty = async (req, res) => {
  try {
    const data = await Repair.findOne({ warrantyId: req.params.id });

    if (!data) {
      return res.status(404).json({ success: false, message: "Invalid Warranty ID" });
    }

    const expired = new Date() > data.warrantyEndDate;

    res.json({
      success: true,
      data: {
        warrantyId: data.warrantyId,
        customerName: data.customerName,
        tvBrand: data.tvBrand,
        serviceDate: data.serviceDate.toISOString().slice(0, 10),
        warrantyExpiry: data.warrantyEndDate.toISOString().slice(0, 10),
        partName: data.partName,
        status: expired ? "Expired" : "Active"
      }
    });

  } catch (err) {
    res.status(500).json({ success: false });
  }
};

// -----------------------------
// GET ALL REPAIRS
// -----------------------------
export const getAllRepairs = async (req, res) => {
  try {
    const data = await Repair.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data
    });

  } catch (err) {
    res.status(500).json({ success: false });
  }
};

// -----------------------------
// DELETE REPAIR
// -----------------------------
export const deleteRepair = async (req, res) => {
  try {
    const deleted = await Repair.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Repair not found" });
    }

    res.json({
      success: true,
      message: "Repair deleted successfully"
    });

  } catch (err) {
    res.status(500).json({ success: false });
  }
};

// -----------------------------
// UPDATE REPAIR + WARRANTY
// -----------------------------
export const updateRepair = async (req, res) => {
  try {
    const {
      customerName,
      phone,
      tvBrand,
      partName,
      warrantyNumber,
      warrantyUnit
    } = req.body;

    const warrantyStartDate = new Date();
    const warrantyEndDate = calculateWarrantyEnd(
      warrantyStartDate,
      warrantyNumber,
      warrantyUnit
    );

    const updated = await Repair.findByIdAndUpdate(
      req.params.id,
      {
        customerName,
        phone,
        tvBrand,
        partName,
        warrantyNumber,
        warrantyUnit,
        warrantyStartDate,
        warrantyEndDate
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Repair entry not found" });
    }

    res.json({
      success: true,
      message: "Warranty updated successfully",
      updated
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
};
