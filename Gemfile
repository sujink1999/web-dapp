source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "2.7.3"

gem "rails", "~> 6.1.4", ">= 6.1.4.6"
gem "pg", "~> 1.1"
gem "puma", "~> 5.6"

# Frontend Dependencies
gem "sass-rails", ">= 6"
gem "webpacker", github: "rails/webpacker", branch: "master"
gem "jbuilder", "~> 2.7"
gem "react_on_rails", "= 12.2.0"
gem "mini_racer", platforms: :ruby

# Email
gem "bootstrap-email"

# Auth
gem "clearance"

# Throttle requests
gem "rack-attack"

# Web 3
gem "eth"
gem "ethereum.rb"

# Crypto
gem "lockbox" # for application level encryption
gem "blind_index" # for searchable encryption

# Pagination
gem "pagy", "~> 4.8"

# Use Redis adapter to run Action Cable in production
gem "redis", "~> 4.3"
gem "bcrypt"

# Image manipulation
gem "rmagick"

# File Attachment toolkit
gem "shrine", "~> 3.0"
gem "marcel", "~> 1.0" # mime-type analyzer
gem "aws-sdk-s3"
gem "aws-sdk-lambda"
gem "uppy-s3_multipart", "~> 1.0"
gem "image_processing", "~> 1.12", require: false

gem "bootsnap", ">= 1.4.4", require: false

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]

# For data generation
gem "faker"

# Error tracking
gem "rollbar"

# Async jobs
gem "sidekiq"
gem "sidekiq-scheduler"
gem "sidekiq-status"

# Requests
gem "faraday"
gem "down"

# GraphQL
gem "graphql-client"

# JSON Object Presenter
gem "blueprinter"

# Notifications
gem "noticed", "~> 1.5"

# Perfomance monitoring
gem "newrelic_rpm"

# Slug generation
gem "friendly_id", "~> 5.4.0"

# Audits
gem "paper_trail"

# Data analytics
gem "blazer"

group :development, :test do
  gem "awesome_print"
  gem "bundler-audit"
  gem "byebug", platforms: %i[mri mingw x64_mingw]
  gem "dotenv-rails"
  gem "factory_bot_rails", "~> 6.2.0"
  gem "pry-byebug"
  gem "pry-rails"
  gem "standard"
  gem "bullet"
end

group :development do
  gem "letter_opener_web"
  gem "web-console", ">= 4.1.0"
  gem "rack-mini-profiler", "~> 2.0"
  gem "listen", "~> 3.3"
  gem "spring"
  gem "foreman"
end

group :test do
  gem "capybara", ">= 3.26"
  gem "rails-controller-testing"
  gem "rspec-rails", "~> 5.0.1"
  gem "selenium-webdriver"
  gem "shoulda-matchers", "~> 4.5.1"
  gem "webdrivers"
  gem "simplecov"
  gem "codecov"
end
