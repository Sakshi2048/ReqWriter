import bcrypt from "bcrypt";
import User from "../models/userModel.js";

// Handle User Registration
async function handleRegister(req, res) {
  try {
    const { username, password, token, baseurl } = req.body;

    if (!username || !password || !token || !baseurl) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await User.findOne({ username });
    
    if (existingUser) {
      return res.status(409).json({ message: "User already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      password: hashedPassword,
      token,
      baseURL:baseurl
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully." });
  } 
  catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
}

// Handle User Login
async function handleLogin(req, res) {
  try {
    const username = req.body.username?.trim();
    const { password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found. Please register first." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password." });
    }

    res.status(200).json({
      message: "Login successful!",
      user: {
        username: user.username,
        token: user.token,
        baseURL: user.baseURL
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
}

export { handleRegister, handleLogin };
