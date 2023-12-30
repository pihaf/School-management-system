const Admin = require('../models/Admin');

// Create a new admin
exports.createAdmin = async (req, res) => {
    // Allow access only to admins
  if (req.model !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
  }
  const { name, email, username, password } = req.body;

  try {
    // Check if the username already exists
    const existingAdmin = await Admin.findOne({ where: { username } });
    if (existingAdmin) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the admin
    const admin = await Admin.create({
      name,
      email,
      username,
      password: hashedPassword
    });

    // Generate JWT token for the admin
    const newToken = admin.generateAuthToken();

    res.status(201).json({ admin, token: newToken });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create admin' });
  }
};

// Get admin profile
exports.getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.verifyAuthToken(req.token);
    res.json(admin);
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// Update admin profile
exports.updateAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.verifyAuthToken(req.token);

    // Update the admin information
    admin.name = req.body.name || admin.name;
    admin.email = req.body.email || admin.email;
    admin.username = req.body.username || admin.username;
    admin.password = req.body.password || admin.password;

    await admin.save();

    res.json(admin);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};