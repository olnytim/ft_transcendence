from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from .models import PongPlayer, PongGame

User = get_user_model()

class PongPlayerModelTest(TestCase):
    def test_create_pong_player(self):
        user = User.objects.create_user(username='ponguser', password='pongpass')
        pp = PongPlayer.create(user)
        self.assertTrue(PongPlayer.objects.filter(pk=pp.pk).exists())
        self.assertEqual(pp.nickname, 'ponguser_pong')

    def test_win_rate(self):
        pp = PongPlayer(user=User.objects.create_user(username='u', password='p'), nickname='u', total_games=4, wins=3, losses=1)
        self.assertAlmostEqual(pp.win_rate(), 75.0)
        pp.total_games = 0
        self.assertEqual(pp.win_rate(), 0)

class PongAPIIntegrationTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='apiuser', password='apipass')
        self.pp = PongPlayer.create(self.user)
        self.client.login(username='apiuser', password='apipass')

    def test_list_pong_players(self):
        response = self.client.get('/api/pong-players/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.json()
        self.assertTrue(any(item['nickname'] == self.pp.nickname for item in data))

    def test_create_and_list_pong_game(self):
        # create second player
        user2 = User.objects.create_user(username='apiuser2', password='apipass2')
        pp2 = PongPlayer.create(user2)
        payload = {'player1': self.pp.id, 'player2': pp2.id, 'score1': 5, 'score2': 3}
        response = self.client.post('/api/pong-games/', payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        game_id = response.json().get('id')
        # list games
        response = self.client.get('/api/pong-games/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        games = response.json()
        self.assertTrue(any(g['id'] == game_id for g in games))
