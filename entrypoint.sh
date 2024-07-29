#!/bin/sh

echo "Starting application in $( [ $DEBUG = "True" ] && echo "development" || echo "production" ) mode"

python ./manage.py makemigrations --noinput
python ./manage.py migrate --noinput
python ./manage.py collectstatic --noinput

if [ $DEBUG = "True" ]
then
    python ./manage.py runserver 0.0.0.0:8000
else
    gunicorn config.wsgi:application --bind 0.0.0.0:8000
fi