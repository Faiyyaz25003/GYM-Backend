
// import Contact from "../Models/contactModel.js";

// export const createContact = async (req, res) => {
//   try {
//     const { name, email, phone, subject, message } = req.body;
//     if (!name || !email || !phone || !subject || !message) {
//       return res.status(400).json({ error: 'All fields are required' });
//     }
//     const newContact = new Contact({ name, email, phone, subject, message });
//     await newContact.save();
//     res.status(201).json({ message: 'Message sent successfully' });
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// export const getContacts = async (req, res) => {
//   try {
//     const contacts = await Contact.find().sort({ createdAt: -1 });
//     res.json(contacts);
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// export const deleteContact = async (req, res) => {
//   try {
//     const { id } = req.params;
//     await Contact.findByIdAndDelete(id);
//     res.json({ message: 'Contact deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
// };


import Contact from "../Models/contactModel.js";
import Notification from "../Models/notificationModel.js";

export const createContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Save contact form
    const newContact = new Contact({ name, email, phone, subject, message });
    await newContact.save();

    // Create admin notification
    const newNotification = new Notification({
      title: '📥 New Contact Form Submission',
      message: `${name} (${email}, ${phone}) submitted a "${subject}" query.`,
      type: 'info'
    });
    await newNotification.save();

    res.status(201).json({ message: 'Message sent successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    await Contact.findByIdAndDelete(id);
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
