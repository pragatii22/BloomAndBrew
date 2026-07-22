const { createContactMessage } = require('../model/contactModel');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const sendMessage = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !name.trim()) {
            return res.status(400).json({ message: "Name is required" });
        }
        if (!email || !EMAIL_REGEX.test(email)) {
            return res.status(400).json({ message: "A valid email is required" });
        }
        if (!message || !message.trim()) {
            return res.status(400).json({ message: "Message cannot be empty" });
        }

        const saved = await createContactMessage(name.trim(), email.trim(), message.trim());

        res.status(201).json({
            message: "Message sent successfully",
            contact: saved
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { sendMessage };
