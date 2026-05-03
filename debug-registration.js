// Test the API call that's failing in the client
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Mock Firebase token for testing
const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0LXVzZXItMTIzIiwiZW1haWwiOiJ0ZXN0QGV4YW1wbGUuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWV9.test-signature';

async function testClientRegistration() {
  try {
    console.log('Testing client-side registration API call...');
    
    const response = await apiClient.post('/users/create-user', {
      name: 'Test User',
      email: 'test@example.com',
      photoURL: ''
    }, {
      headers: {
        'Authorization': `Bearer ${mockToken}`
      }
    });
    
    console.log('✅ Client registration successful:', response.data);
  } catch (error) {
    console.error('❌ Client registration failed:', error.response?.data || error.message);
    if (error.response?.data) {
      console.error('Error details:', JSON.stringify(error.response.data, null, 2));
    }
  }
}

testClientRegistration();
