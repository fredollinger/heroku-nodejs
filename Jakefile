function sh(cmd){
    var cmds = [
        cmd
    ];
    jake.exec(cmds, {interactive : true}, function() { complete(); });
}

desc('Start node');
task('start', {async : true}, function() {
    var cmds = [
        'nodejs index.js'  
    ];
    jake.exec(cmds, {interactive : true}, function() { complete(); });
}); // END START

desc('Default task');
task('default', function () {
  // Calls foo:bar and its prereqs
    jake.Task['start'].invoke();
});

desc('Delete databases');
task('dbclean', {async : true}, function() {
    sh('nodejs bin/dbclean.js');
}); 

desc('Start node');
task('open', {async : true}, function() {
    var cmds = [
        'firefox localhost:3000'
    ];
    jake.exec(cmds, {interactive : true}, function() { complete(); });
}); // END START

namespace('test', function () {
desc('Test Code To Cache an Address then Read that Back');
task('cacheaddy', {async : true}, function() {
    sh('nodejs test/cacheaddy.js');
}); // END ADDYCACHE

desc('Test database. TODO: DESC MORE');
task('db', {async : true}, function() {
    sh('nodejs test/dbtest.js');
}); // END ADDYCACHE

desc('Tests validate code');
task('validate', {async : true}, function() {
    sh('test/validate.js');
}); // END TEST

desc('Tests map code');
task('map', {async : true}, function() {
    sh('nodejs test/gmaps.js');
}); // END TEST

}); // END namespace test



