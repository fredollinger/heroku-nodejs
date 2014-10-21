desc('Tests validate code');
task('validate', {async : true}, function() {
    var cmds = [
        'test/validate.js' 
    ];
    jake.exec(cmds, {interactive : true}, function() { complete(); });
}); // END TEST

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

desc('Start node');
task('open', {async : true}, function() {
    var cmds = [
        'firefox localhost:3000'
    ];
    jake.exec(cmds, {interactive : true}, function() { complete(); });
}); // END START
