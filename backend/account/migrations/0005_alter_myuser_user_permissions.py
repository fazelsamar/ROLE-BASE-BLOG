# Generated by Django 4.2.4 on 2023-08-11 19:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0004_MyPermissions'),
    ]

    operations = [
        migrations.AlterField(
            model_name='myuser',
            name='user_permissions',
            field=models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='custome_user_set', related_query_name='custome_user', to='account.mypermission', verbose_name='user permissions'),
        ),
    ]
