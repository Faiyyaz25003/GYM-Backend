// import User from '../Models/User.js';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';

// // ✅ Register
// export const register = async (req, res) => {
//   try {
//     const { name, email, password, mobile, dob, gender, address, role } = req.body;

//     const existing = await User.findOne({ email });
//     if (existing) return res.status(400).json({ message: 'User already exists' });

//     const hashed = await bcrypt.hash(password, 10);

//     const user = new User({
//       name,
//       email,
//       password: hashed,
//       mobile,
//       dob,
//       gender,
//       address,
//       role,
//       isActive: true, // Active by default on registration
//       lastLogin: new Date()
//     });

//     await user.save();
//     res.status(201).json({ message: 'Registered successfully', user });
//   } catch (err) {
//     console.error("Register error:", err);
//     res.status(500).json({ message: 'Error registering user' });
//   }
// };

// // ✅ Login
// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     const match = await bcrypt.compare(password, user.password);
//     if (!match) return res.status(400).json({ message: 'Invalid credentials' });

//     user.isActive = true;
//     user.lastLogin = new Date();
//     await user.save();

//     const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

//     res.json({
//       token,
//       user: {
//         _id: user._id,
//         name: user.name,
//         role: user.role
//       }
//     });
//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ message: 'Login failed' });
//   }
// };

// // ✅ Get All Users
// export const getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find().select('-password').sort({ createdAt: -1 });
//     res.status(200).json(users);
//   } catch (err) {
//     console.error("Fetching users failed:", err);
//     res.status(500).json({ error: 'Something went wrong on the server.' });
//   }
// };

// // ✅ Delete a User
// export const deleteUser = async (req, res) => {
//   try {
//     const deletedUser = await User.findByIdAndDelete(req.params.id);
//     if (!deletedUser) return res.status(404).json({ message: 'User not found' });

//     res.json({ message: 'User deleted successfully' });
//   } catch (err) {
//     console.error("Delete error:", err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // ✅ Count Active Users
// export const getActiveUsers = async (req, res) => {
//   try {
//     const activeUsersCount = await User.countDocuments({ isActive: true });
//     res.status(200).json({ count: activeUsersCount });
//   } catch (err) {
//     console.error('Active user count error:', err);
//     res.status(500).json({ message: 'Failed to fetch active users' });
//   }
// };

// // ✅ Update Active/Inactive Status
// // ✅ Update Active/Inactive Status
// export const updateActiveStatus = async (req, res) => {
//   const { token, active } = req.body;

//   try {
//     if (!token) {
//       return res.status(400).json({ message: 'Token missing' });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     await User.findByIdAndUpdate(decoded.id, { isActive: active });

//     const activeCount = await User.countDocuments({ isActive: true });

//     // ✅ If it's a sendBeacon() call, browser won't read the response,
//     // but for axios or testing, we still return something:
//     res.status(200).json({ success: true, count: activeCount });

//   } catch (err) {
//     console.error("Active status update failed:", err);
//     res.status(500).json({ message: "Server error while updating activity status" });
//   }
// };
import User from '../Models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

/* -----------------------------
   Nodemailer Setup
------------------------------ */
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT, 10),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Welcome Email Function
const sendEmail = async (to, name) => {
  try {
    await transporter.sendMail({
      from: `"Fitness GYM" <${process.env.SMTP_USER}>`,
      to: to,
      subject: "Welcome to Fitness GYM",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background: #f9f9f9;">
          <h2 style="color: #6c63ff;">Welcome to Fitness GYM!</h2>
          <p>Hi <strong>${name}</strong>,</p>
          <p>Thank you for registering with <b>Fitness GYM</b>. Your account has been created successfully.</p>
          <p>You can now log in and explore our features to achieve your fitness goals!</p>
          <br/>
          <p style="font-size: 14px; color: #555;">Best regards,<br/>Fitness GYM Team</p>
        </div>
      `,
    });

    console.log(`✅ Welcome email sent to: ${to}`);
  } catch (err) {
    console.error("❌ Email send error:", err.message);
  }
};

/* -----------------------------
   Register User
------------------------------ */
export const register = async (req, res) => {
  try {
    const { name, email, password, mobile, dob, gender, address, role } = req.body;

    // Check existing
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      name,
      email,
      password: hashed,
      mobile,
      dob,
      gender,
      address,
      role,
      isActive: true,
      lastLogin: new Date(),
    });

    await user.save();

    // Send welcome email
    await sendEmail(email, name);

    res.status(201).json({ message: 'Registered successfully', user });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: 'Error registering user' });
  }
};

/* -----------------------------
   Login User
------------------------------ */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    user.isActive = true;
    user.lastLogin = new Date();
    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: 'Login failed' });
  }
};

/* -----------------------------
   Get All Users
------------------------------ */
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (err) {
    console.error("Fetching users failed:", err);
    res.status(500).json({ error: 'Something went wrong on the server.' });
  }
};

/* -----------------------------
   Delete User
------------------------------ */
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: 'Server error' });
  }
};

/* -----------------------------
   Count Active Users
------------------------------ */
export const getActiveUsers = async (req, res) => {
  try {
    const activeUsersCount = await User.countDocuments({ isActive: true });
    res.status(200).json({ count: activeUsersCount });
  } catch (err) {
    console.error('Active user count error:', err);
    res.status(500).json({ message: 'Failed to fetch active users' });
  }
};

/* -----------------------------
   Update Active Status
------------------------------ */
export const updateActiveStatus = async (req, res) => {
  const { token, active } = req.body;

  try {
    if (!token) {
      return res.status(400).json({ message: 'Token missing' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await User.findByIdAndUpdate(decoded.id, { isActive: active });

    const activeCount = await User.countDocuments({ isActive: true });

    res.status(200).json({ success: true, count: activeCount });
  } catch (err) {
    console.error("Active status update failed:", err);
    res.status(500).json({ message: "Server error while updating activity status" });
  }
};
