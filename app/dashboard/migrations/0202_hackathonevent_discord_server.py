# Generated by Django 2.2.24 on 2022-05-06 18:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0201_merge_20220427_1416'),
    ]

    operations = [
        migrations.AddField(
            model_name='hackathonevent',
            name='discord_server',
            field=models.URLField(blank=True, help_text='Link to Discord server for Hackathon', null=True),
        ),
    ]