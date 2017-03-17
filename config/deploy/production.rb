set :stage, :production

# server-based syntax
# ======================
# Defines a single server with a list of roles and multiple properties.
# You can define all roles on a single server, or split them:

# server 'example.com', user: 'deploy', roles: %w{app db web}, my_property: :my_value
# server 'example.com', user: 'deploy', roles: %w{app web}, other_property: :other_value
# server 'db.example.com', user: 'deploy', roles: %w{db}
# server "52.198.179.176", user: "ec2-user", roles: %w{app web db}
# server "52.193.45.182", user: "ec2-user", roles: %w{app web}
server "20.0.2.253", user: "deploy", roles: %w{app web db}
server "20.0.2.76", user: "deploy", roles: %w{app web}

set :assets_roles, [:web, :app]

set :unicorn_rack_env, "production"

set :redis_host, "witty-redis.m7bea6.ng.0001.apne1.cache.amazonaws.com"
# role-based syntax
# ==================

# Defines a role with one or multiple servers. The primary server in each
# group is considered to be the first unless any  hosts have the primary
# property set. Specify the username and a domain or IP for the server.
# Don't use `:all`, it's a meta role.

# role :app, %w{deploy@example.com}, my_property: :my_value
# role :web, %w{user1@primary.com user2@additional.com}, other_property: :other_value
# role :db,  %w{deploy@example.com}



# Configuration
# =============
# You can set any configuration variable like in config/deploy.rb
# These variables are then only loaded and set in this stage.
# For available Capistrano configuration variables see the documentation page.
# http://capistranorb.com/documentation/getting-started/configuration/
# Feel free to add new variables to customise your setup.
# set :deploy_to, "/home/ec2-user/app"
set :deploy_to, "/home/deploy/app"

# Custom SSH Options
# ==================
# You may pass any option but keep in mind that net/ssh understands a
# limited set of options, consult the Net::SSH documentation.
# http://net-ssh.github.io/net-ssh/classes/Net/SSH.html#method-c-start
#
# Global options
# --------------
#  set :ssh_options, {
#    keys: %w(/home/rlisowski/.ssh/id_rsa),
#    forward_agent: false,
#    auth_methods: %w(password)
#  }
#
# The server-based syntax can be used to override options:
# ------------------------------------
# server 'example.com',
#   user: 'user_name',
#   roles: %w{web app},
#   ssh_options: {
#     user: 'user_name', # overrides user setting above
#     keys: %w(/home/user_name/.ssh/id_rsa),
#     forward_agent: false,
#     auth_methods: %w(publickey password)
#     # password: 'please use keys'
#   }
task :backup_db_production do
  on roles :db do
    execute "mysqldump -h20.0.1.16 -uroot -pkrSbXA5M faqdb > /home/deploy/app/faqdb-" +
      "#{Time.now.strftime("%Y%m%d")}.sql"
  end
end

task :notify_chatwork_production do
  on roles :db do
    execute 'curl -s -X POST -H "X-ChatWorkToken: 8d713ee0601fe6de5e94587ecac6460c" -d $\'body=' +
      '[To:1474283] Nguyen Xuan Quang\n' +
      '[To:1474267] Tran Minh Hang\n' +
      '>> PRODUCTION DEPLOYED <<\n' +
      'http://faq-elb-1698680103.ap-northeast-1.elb.amazonaws.com\' ' +
      'https://api.chatwork.com/v1/rooms/47423136/messages'
  end
end

after "deploy:starting", "backup_db_production"
after "deploy:publishing", "notify_chatwork_production"
