require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Faq
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
    # Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
    # config.time_zone = 'Central Time (US & Canada)'
    config.time_zone = "Tokyo"
    config.active_record.default_timezone = :local

    config.before_configuration do
      env_file = File.join(Rails.root, "config", "local_env.yml")
      YAML.load(File.open(env_file)).each do |key, value|
        ENV[key.to_s] = value
      end if File.exists?(env_file)
    end
    config.i18n.load_path += Dir[Rails.root.join("config", "locales", "**",
      "*.{rb,yml}")]
    config.autoload_paths << Rails.root.join("app/services")
    config.i18n.default_locale = ENV["LOCALE"] ? ENV["LOCALE"].to_sym : :en
    config.i18n.locale = ENV["LOCALE"] ? ENV["LOCALE"].to_sym : :en
    config.active_record.raise_in_transactional_callbacks = true

    config.paperclip_defaults = {
      path: ":rails_root/public/system/:class/:id/:style/:custom_filename",
      url: "/system/:class/:id/:style/:custom_filename"
    }

    config.action_cable.disable_request_forgery_protection = true
  end
end
