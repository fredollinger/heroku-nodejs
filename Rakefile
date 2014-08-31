task :default => :refresh

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