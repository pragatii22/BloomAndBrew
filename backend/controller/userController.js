const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, getUserByEmail } = require('../model/userModel');

const register = async (req, res) => {
    try {

        const { name, email, password } = req.body;


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


        res.json({
            message: "User registered",
            user
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