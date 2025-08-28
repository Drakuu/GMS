import Models from '@/models';
import bcrypt from 'bcryptjs';

const defaultSuperAdmin = {
  email: process.env.SUPER_ADMIN_EMAIL || 'superadmin@example.com',
  password: process.env.SUPER_ADMIN_PASSWORD || 'SuperAdmin@123',
  name: 'Default Super Admin',
  phone: '+1234567890'
};

export async function createSuperAdmin(config = {}) {
  const { email, password, name, phone } = { ...defaultSuperAdmin, ...config };

  try {
    // Check if super admin exists
    const existingAdmin = await Models.User.findOne({ user_role: 'SuperAdmin' });
    if (existingAdmin) {
      console.log('ℹ️ SuperAdmin exists:', existingAdmin.user_email);
      return existingAdmin;
    }

    // Create new super admin
    const superAdmin = await Models.User.create({
      user_name: name,
      user_email: email,
      user_phone: phone,
      user_password: await bcrypt.hash(password, 12),
      user_role: 'SuperAdmin',
      is_verified: true
    });

    console.log('✅ SuperAdmin created:', superAdmin.user_email);
    return superAdmin;
  } catch (error) {
    console.error('❌ SuperAdmin creation failed:', error);
    throw error;
  }
}