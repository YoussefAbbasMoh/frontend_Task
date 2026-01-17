const mongoose = require('mongoose');
require('dotenv').config();
const User = require('../models/User.model');
const Role = require('../models/Role.model');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/backend-api';

async function seed() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data (optional - comment out if you want to keep existing data)
    await User.deleteMany({});
    await Role.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create roles
    const roles = [
      { roleId: 1, name: 'Admin', description: 'Administrator role with full access' },
      { roleId: 2, name: 'User', description: 'Standard user role' },
      { roleId: 3, name: 'Moderator', description: 'Moderator role with limited admin access' }
    ];

    const createdRoles = await Role.insertMany(roles);
    console.log(`✅ Created ${createdRoles.length} roles`);

    // Create users
    const users = [
      {
        name: 'John Doe',
        email: 'john.doe@example.com',
        roleId: 1 // Admin
      },
      {
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        roleId: 2 // User
      },
      {
        name: 'Bob Johnson',
        email: 'bob.johnson@example.com',
        roleId: 3 // Moderator
      }
    ];

    const createdUsers = await User.insertMany(users);
    console.log(`✅ Created ${createdUsers.length} users`);

    console.log('\n📊 Seed data summary:');
    console.log(`   Roles: ${createdRoles.length}`);
    console.log(`   Users: ${createdUsers.length}`);
    console.log('\n✨ Seeding completed successfully!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seed();

