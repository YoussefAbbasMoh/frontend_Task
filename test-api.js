/**
 * Simple API Test Script
 * Run this after deployment to test your APIs
 * Usage: node test-api.js <your-deployed-url>
 * Example: node test-api.js https://backend-api.onrender.com
 */

const BASE_URL = process.argv[2] || 'http://localhost:3000';

async function testAPI() {
  console.log(`🧪 Testing APIs at: ${BASE_URL}\n`);

  try {
    // Test 1: Health Check
    console.log('1️⃣ Testing Health Endpoint...');
    const healthRes = await fetch(`${BASE_URL}/health`);
    const healthData = await healthRes.json();
    console.log('✅ Health Check:', healthData);
    console.log('');

    // Test 2: Get All Roles
    console.log('2️⃣ Testing GET /api/roles...');
    const rolesRes = await fetch(`${BASE_URL}/api/roles`);
    const rolesData = await rolesRes.json();
    console.log(`✅ Found ${rolesData.count} roles`);
    console.log('Roles:', rolesData.data.map(r => `${r.name} (ID: ${r.roleId})`).join(', '));
    console.log('');

    // Test 3: Get All Users
    console.log('3️⃣ Testing GET /api/users...');
    const usersRes = await fetch(`${BASE_URL}/api/users`);
    const usersData = await usersRes.json();
    console.log(`✅ Found ${usersData.count} users`);
    usersData.data.forEach((user, index) => {
      console.log(`   ${index + 1}. ${user.name} (${user.email}) - Role ID: ${user.roleId}`);
    });
    console.log('');

    // Test 4: Add New User
    console.log('4️⃣ Testing POST /api/users...');
    const newUser = {
      name: 'API Test User',
      email: `test-${Date.now()}@example.com`,
      roleId: 1
    };
    const addUserRes = await fetch(`${BASE_URL}/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    });
    const addUserData = await addUserRes.json();
    if (addUserRes.ok) {
      console.log('✅ User created successfully:', addUserData.data.name);
    } else {
      console.log('❌ Error:', addUserData.error || addUserData.message);
    }
    console.log('');

    // Test 5: Verify New User in List
    console.log('5️⃣ Verifying new user in list...');
    const usersRes2 = await fetch(`${BASE_URL}/api/users`);
    const usersData2 = await usersRes2.json();
    console.log(`✅ Total users now: ${usersData2.count}`);
    console.log('');

    console.log('✨ All tests completed!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

testAPI();

