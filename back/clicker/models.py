from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth import get_user_model

User = get_user_model()

class ClickerPlayer (models.Model):
    user = models.ForeignKey(User, related_name='clicker_players', on_delete=models.CASCADE)
    nickname = models.CharField(max_length = 100)
    number_of_matches = models.IntegerField(default=0)
    average_click_speed = models.FloatField(default=0)

    def __str__(self): return self.nickname

    @classmethod
    def create(cls, user):
       print(f"Creating ClickerPlayer for user {user}", flush=True)
       return cls.objects.create(user=user, nickname=user.username + "_clicker")

class ClickerGame (models.Model):
    players = models.ManyToManyField(ClickerPlayer, related_name='clicker_games')
    clicks = ArrayField(models.IntegerField())
    time = models.IntegerField()

class ClickerMatch(models.Model):
    time = models.IntegerField()

class ClickerPlayerInfo (models.Model):
    match = models.ForeignKey(ClickerMatch,
                              related_name='clicker_player_info',
                              on_delete=models.CASCADE)
    name = models.CharField(max_length = 100)
    clicks = models.IntegerField()

    def __str__(self):
        return f"{self.name} - Clicks: {self.clicks} (Match {self.match.id})"