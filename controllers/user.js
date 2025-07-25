const usermodel = require("../modules/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const tokenBlacklist = require("./tokenBlacklist");
const JWT_SECRET = "ommeghani";
exports.signup = async (req, res) => {
  try {
    const { email, username, password, role } = req.body;
    if (!email || !password || !username || !role) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long." });
    }
    if (username.length < 3) {
      return res
        .status(400)
        .json({ message: "Username must be at least 3 characters long." });
    }
    const ValidRoles = ["user","admin"];
    if (!ValidRoles.includes(role)) {
      return res.status(400).json({message : "Invalid role. Must be'User ' or 'admin"})
    }
    const user = await usermodel.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exists." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await usermodel.create({
      email,
      username,
      password: hashedPassword,
      role,
    });
    await newUser.save();
    res.status(200).json({ message: "User created successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "please fields are required" });
    }
    const loginuser = await usermodel.findOne({ email });
    if (!loginuser) {
      return res
        .status(400)
        .json({ message: "Invalid email, the email is not registered" });
    }
    const isPassword = await bcrypt.compare(password, loginuser.password);
    if (!isPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: loginuser._id, email: loginuser.email, role: loginuser.role },
      JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    res.status(200).json({ message: "Login successful", token, role: loginuser.role });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.logout = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res
        .status(400)
        .json({ message: "Authorization header is missing." });
    }
    const parts = authHeader.trim().split(/\s+/);
    const token = parts.length === 2 && parts[0] === "Bearer" ? parts[1] : null;
    if (!token) {
      return res.status(400).json({ message: "Token not provided" });
    }
    tokenBlacklist.add(token);
    res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
