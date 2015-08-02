var Promise = require('bluebird');

function exec(cmd) {
  var child_process = require('child_process');

  return new Promise(function(resolve, reject) {
    child_process.exec(cmd, function(err, stdout, stderr) {
      console.log(cmd)
      if (!err) {
        resolve(stdout.trim());
      } else {
        reject(err);
      }
    });
  });
}

exec('echo 1').then(function(v) {
  return exec('echo 2')
}).then(function(v) {
  console.log(v);
})
;

