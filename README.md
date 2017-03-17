# FAQ

Install Webpack
```
npm install webpack -g
```

Run `webpack` to compile JSX to JS

For development, run `webpack --watch` to auto-compile when you make changes on JSX files

Install ImageMagick for resize uploaded images
and ffmpeg to generate thumbnail for uploaded videos
```
sudo apt-get install imagemagick
sudo apt-get install ffmpeg
```

### React/JSX Style Guide
https://github.com/airbnb/javascript/tree/master/react#basic-rules


### Database
- Character Set: utf8
- Collate: utf8_unicode_ci
`CREATE DATABASE faq CHARACTER SET utf8 COLLATE utf8_unicode_ci;`

### Notes
Following tables must be seeded after deploying
```
settings
trouble_names
```

#### CD (Continuous Deployment)
cd.framgia.com.vn

Set CHATWORK_TOKEN as following instruction:
http://readme.drone.io/usage/secrets/

http://readme.drone.io/devs/cli/


### Deployment Notes
Set properly ownership to folder `/var/lib/nginx`

Download ffmpeg at:
https://www.johnvansickle.com/ffmpeg/

#### Requirements:
redis (for caching)

#### Start-up Services
nginx, redis, cron

### Config auto start Docker when server restart
This configuration is not included in Docker, it's configured in server where contain Docker
- First create a file script that start Docker and start some services. Save this in
  /var/www/html/reopen_stop_server.sh
```
#!/bin/bash
# Start testing server
docker start testing
docker exec testing start_server
docker exec testing /bin/bash -l -c 'cd /var/www/html/app/current; bundle exec pumactl -S /var/www/html/app/shared/tmp/pids/puma.state stop'
docker exec testing /bin/bash -lc 'cd /var/www/html/app/current; bundle exec puma -C /var/www/html/app/shared/puma.rb --daemon'

# Start staging server
docker start staging
docker exec staging start_server
docker exec staging /bin/bash -l -c 'cd /var/www/html/app/current; bundle exec pumactl -S /var/www/html/app/shared/tmp/pids/puma.state stop'
docker exec staging /bin/bash -lc 'cd /var/www/html/app/current; bundle exec puma -C /var/www/html/app/shared/puma.rb --daemon'
```
- Next add script file to crontab
```
@reboot /var/www/html/reopen_stop_server.sh
```
