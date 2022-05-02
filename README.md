# slackTestApp

Sample Node JS application for testing the Slack Bolt JS API, using HTTP method and Events API.

# list ports in use

sudo ss -tulpn | grep LISTEN

# kill if port is already in use by this process

kill -9 $(lsof -t -i tcp:5001)
