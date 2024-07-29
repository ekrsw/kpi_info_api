# Generated by Django 5.0.7 on 2024-07-28 14:36

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_kpimodel_created_at_alter_kpimodel_updated_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='kpimodel',
            name='created_at',
            field=models.DateTimeField(default=django.utils.timezone.now, editable=False),
        ),
        migrations.AlterField(
            model_name='kpimodel',
            name='updated_at',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
