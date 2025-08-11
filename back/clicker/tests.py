from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from .models import ClickerPlayer, ClickerGame, ClickerMatch

User = get_user_model()

class ClickerPlayerModelTest(TestCase):
    def test_create_clicker_player(self):
        user = User.objects.create_user(username='testuser', password='testpass')
        cp = ClickerPlayer.create(user)
        self.assertTrue(ClickerPlayer.objects.filter(pk=cp.pk).exists())
        self.assertEqual(cp.nickname, 'testuser_clicker')

class ClickerAPIIntegrationTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='apiuser', password='apipass')
        ClickerPlayer.create(self.user)
        # authenticate session
        self.client.login(username='apiuser', password='apipass')

    def test_list_clicker_players(self):
        response = self.client.get('/api/clicker-players/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.json()
        self.assertTrue(any(item['nickname'] == 'apiuser_clicker' for item in data))
