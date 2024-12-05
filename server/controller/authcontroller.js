import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
const jwtSecret = "MySuperSecretKey";

export const signupController = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    if (!name) {
      return res.status(400).send({ message: "Name is required" });
    }
    if (!email) {
      return res.status(400).send({ message: "Email is required" });
    }
    if (!password) {
      return res.status(400).send({ message: "Password is required" });
    }
    if (password.length < 5) {
      return res.status(400).send({
        success: false,
        message: "Password must be at least 5 characters long",
      });
    }
    if (!confirmPassword) {
      return res.status(400).send({ message: "Confirm Password is required" });
    }
    if (password !== confirmPassword) {
      return res.status(400).send({
        success: false,
        message: "Passwords do not match",
      });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "Email already in use",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save user
    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
      confirmPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user: { id: user._id, name: user.name, email: user.email }, 
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};


export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Invalid email",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).send({
        success: false,
        message: "Invalid password",
      });
    }

    const data = {
      user: {
        id: user.id,
        email: user.email,
        password: user.password,
      },
    };

    const authToken = jwt.sign(data, process.env.JWT_SECRET || jwtSecret, {
      expiresIn: "1h",
    });

    res.status(200).send({
      success: true,
      authToken,
      message: "Login successful",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};
