# config valid only for current version of Capistrano
lock "3.7.2"

set :application, "faq"
set :repo_url, "git@github.com:framgia/FAQ.git"

# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp
set :branch, "develop"

# Default deploy_to directory is /var/www/my_app_name
set :deploy_to, "/var/www/html/app"

set :local_user, "framgia"

set :whenever_identifier, ->{ "#{fetch(:application)}_#{fetch(:stage)}" }

# Default value for :scm is :git
# set :scm, :git

# Default value for :format is :airbrussh.
# set :format, :airbrussh

# You can configure the Airbrussh format using :format_options.
# These are the defaults.
# set :format_options, command_output: true, log_file: 'log/capistrano.log', color: :auto, truncate: :auto

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
set :linked_files, fetch(:linked_files, []).push(
  "config/local_env.yml",
  "config/database.yml",
  "config/secrets.yml",
  "config/cable.yml",
  "config/react_app.js"
)

# Default value for linked_dirs is []
set :linked_dirs, fetch(:linked_dirs, []).push(
  "log",
  "tmp/pids",
  "tmp/cache",
  "tmp/sockets",
  "node_modules",
  "public/system/attachments"
)

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for keep_releases is 5
# set :keep_releases, 5
set :keep_releases, 10

namespace :deploy do
  task :webpack do
    on roles(:web) do
      within release_path do
        execute "cd '#{release_path}'; npm update && webpack"
      end
    end
  end

  task :flush_redis_cache do
    on roles :db do
      execute "redis-cli -h #{fetch(:redis_host, "127.0.0.1")} flushall"
    end
  end

  task :start_sidekiq do
    on roles(:web) do
      within release_path do
        execute "cd '#{release_path}'; bundle exec sidekiq -d -L log/sidekiq.log"
      end
    end
  end

  after :updating, "deploy:webpack"
  after :publishing, "deploy:start_sidekiq"
  after :publishing, "deploy:flush_redis_cache"
end
