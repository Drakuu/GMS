// utils/initSuperAdmin.js
const User = require("../model/usermodel");
const bcrypt = require("bcryptjs");

const initSuperAdmin = async () => {
  const existing = await User.findOne({ role: "SuperAdmin" });
  if (!existing) {
    const hashed = await bcrypt.hash("superadmin123", 10);
    await User.create({
      email: "superadmin@saasgym.com",
      password: hashed,
      role: "SuperAdmin",
      name: "Super Admin",
      phone: "0000000000",
    });
    console.log("✅ Super Admin created with default credentials");
  }
};

module.exports = initSuperAdmin;
