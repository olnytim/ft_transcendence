# Generated by Django 5.1.1 on 2024-10-21 15:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pong', '0007_highscores_settings'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='HighScores',
            new_name='HighScore',
        ),
        migrations.RenameModel(
            old_name='Settings',
            new_name='Setting',
        ),
    ]