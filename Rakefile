APP="index.js"

task :default => :start

namespace :test do
desc "Test delete of DB"
task :dbdelete do
    sh "nodejs test/dbdelete.js"
end

desc "Test viper the database connector"
task :db do
    sh "nodejs test/dbtest.js"
end

desc "test validator code"
task :validate do
    sh "test/validate.js"
end
desc "test database schema"
task :schema do
    sh "test/schema.js"
end
end # namespace :test

namespace :heroku do
desc "Push changes to git"
task :push do
    sh "git push heroku master"
end

desc "Commit changes to git"
task :commit do
    sh "git commit -a"
end

desc "Restart server"
task :restart do
	sh "heroku stop 1"
	sh "heroku ps:scale web=1"
	sh "heroku logs"
end

desc "View the webpage in a browser"
task :open do
	sh "heroku open"
end

desc "Combo to update everything and view the page"
task :refresh => [:commit, :push, :restart, :open] do
end
end # namespace heroku

desc "Start server locally"
task :start do
    sh "nodejs #{APP}"
end

desc "Stop server"
task :stop do
    sh "killall -9 nodejs"
end

desc "Start server locally"
task :restart => [:stop, :start] do
end

desc "View the webpage in a browser"
task :open do
	sh "firefox localhost:3000"
end

