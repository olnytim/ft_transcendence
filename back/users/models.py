from django.contrib.auth.models import AbstractUser
from django.db import models
from django.apps import apps

class User(AbstractUser):
    """Стандартная модель пользователя Django"""
    
    # Дополнительные поля если нужны
    avatar = models.CharField(max_length=100, blank=True, null=True)
    wallet = models.IntegerField(default=0)
    
    def create_associated_players(self, request):
        """Создает связанные профили игроков"""
        print("Creating associated players", flush=True)
        PongPlayer = apps.get_model('pong', 'PongPlayer')
        ClickerPlayer = apps.get_model('clicker', 'ClickerPlayer')
        PongPlayer.create(self)
        print("Creating associated players after...", flush=True)
        ClickerPlayer.create(self)
    
    def __str__(self):
        return self.username 