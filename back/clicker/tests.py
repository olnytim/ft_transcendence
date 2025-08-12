from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import ClickerPlayer

User = get_user_model()

class ClickerPlayerModelTest(TestCase):
    def test_create_clicker_player(self):
        user = User.objects.create_user(username='testuser', password='testpass')
        cp = ClickerPlayer.create(user)
        self.assertTrue(ClickerPlayer.objects.filter(pk=cp.pk).exists())
