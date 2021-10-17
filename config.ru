require ::File.expand_path('app.rb',__FILE__)
require 'rubygems'
require 'sinatra'
require 'app.rb'
run Sinatra::Application
