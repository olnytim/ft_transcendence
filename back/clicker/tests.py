from django.test import TestCase

class ClickerPlayerModelTest(TestCase):
    def test_create_clicker_player(self):
        user = User.objects.create_user(username='testuser', password='testpass')
        cp = ClickerPlayer.create(user)
        self.assertTrue(ClickerPlayer.objects.filter(pk=cp.pk).exists())
# Create your tests here.
        ClickerPlayer.create(self.user)
        # authenticate session
        self.client.login(username='apiuser', password='apipass')

