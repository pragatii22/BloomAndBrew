const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, getUserByEmail } = require('../model/userModel');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const register = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        if (!name || !name.trim()) {
            return res.status(400).json({ message: "Name is required" });
        }
        if (!email || !EMAIL_REGEX.test(email)) {
            return res.status(400).json({ message: "A valid email is required" });
        }
        if (!password || password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        // check if email already exists
        const existingUser = await getUserByEmail(email);


        if (existingUser) {

            return res.status(400).json({
                message: "Email already exists"
            });

        }


        const hashed = await bcrypt.hash(password, 10);


        const user = await createUser(
            name,
            email,
            hashed,
            'user'
        );

        // never leak the password hash back to the client
        const { password: _pw, ...safeUser } = user;

        res.status(201).json({
            message: "User registered",
            user: safeUser
        });


    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await getUserByEmail(email);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({
                message: "Invalid password"
            });
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({
            message: "Login successful",
            token: `Bearer ${token}`,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { register, login };