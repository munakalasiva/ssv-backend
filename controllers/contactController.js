
import Contact from "../models/Contact.js";

/**
 * Create a new contact message
 * POST /api/contacts
 */
export const createContact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    const contact = await Contact.create({
      name,
      email,
      phone,
      message,
    });

    return res.status(201).json({
      success: true,
      data: contact,
      message: "Contact message submitted successfully",
    });
  } catch (error) {
    console.error("createContact:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * Get all contact messages
 * GET /api/contacts
 */
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    return res.json({
      success: true,
      data: contacts,
    });
  } catch (error) {
    console.error("getContacts:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * Delete a contact message by id
 * DELETE /api/contacts/:id
 */
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact)
      return res.status(404).json({ success: false, message: "Not found" });

    return res.json({
      success: true,
      message: "Contact deleted successfully",
    });
  } catch (error) {
    console.error("deleteContact:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
