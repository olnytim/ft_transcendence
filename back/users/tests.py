from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status

User = get_user_model()

class UserAuthIntegrationTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.register_url = '/auth/register/'
        self.login_url = '/auth/login/'
        self.logout_url = '/auth/logout/'
        self.is_logged_in_url = '/is_logged_in/'
        self.get_user_url = '/auth/user/'
        self.user_data = {'username': 'testuser', 'password': 'testpassword', 'email': 'test@example.com'}

    def test_user_registration_and_login_flow(self):
        # Registration
        response = self.client.post(self.register_url, self.user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Duplicate registration
        response = self.client.post(self.register_url, self.user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        # Login
        response = self.client.post(self.login_url, {'username': 'testuser', 'password': 'testpassword'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Check login status
        response = self.client.get(self.is_logged_in_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.json().get('is_logged_in', False))

        # Logout
        response = self.client.post(self.logout_url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # After logout, user should be logged out
        response = self.client.get(self.is_logged_in_url)
        self.assertEqual(response.json().get('is_logged_in', True), False)

    def test_registration_missing_fields(self):
        # Missing password
        response = self.client.post(self.register_url, {'username': 'user1'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        # Missing username
        response = self.client.post(self.register_url, {'password': 'password1'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_login_missing_fields(self):
        # Missing password
        response = self.client.post(self.login_url, {'username': 'user1'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        # Missing username
        response = self.client.post(self.login_url, {'password': 'password1'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_login_invalid_credentials(self):
        response = self.client.post(self.login_url, {'username': 'nouser', 'password': 'nopass'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_authenticated_user(self):
        # Register and login user first
        self.client.post(self.register_url, self.user_data, format='json')
        self.client.post(self.login_url, {'username': self.user_data['username'], 'password': self.user_data['password']}, format='json')

        # Make authenticated request
        response = self.client.get(self.get_user_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.json()
        self.assertTrue(data['is_authenticated'])
        self.assertEqual(data['username'], self.user_data['username'])

    def test_get_unauthenticated_user(self):
        # Make unauthenticated request
        response = self.client.get(self.get_user_url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
