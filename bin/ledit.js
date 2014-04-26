#!/usr/bin/env node

var program = require('commander'),
  _ = require('underscore'),
  fs = require('node-fs'),
  path = require('path');


var mode, config,
  configPath = path.join(process.cwd(), '.livedit.json')

try {
  config = require(configPath)
}
catch (e) {}

config = config || {}

program.command('config')
  .option('-s, --source <path>', 'Sets the default source directory to watch')
  .option('-t, --target <path>', 'Sets the default target directory to copy files to')
  .action(writeConfig)

program
  .usage('<source> <target>')
  .description('Automatically copies changed files from the source location to the target location.')
  .parse(process.argv);

function writeConfig(cmd) {
  var source, target;

  mode = 'writeConfig'

  source = cmd.source;
  target = cmd.target;

  if(source) config.source = source;
  if(target) config.target = target;

  fs.writeFileSync(configPath, JSON.stringify(config), 'utf-8');
  console.log('Wrote ledit config file to ', configPath)
}

if(!mode) liveedit()

function liveedit() {
  var source = program.args[0] || config.source || 'rave-portal-resources/src/main/webapp/',
    target = program.args[1] || config.target || 'rave-portal/target/tomcat6x/webapps/portal/';

  source = path.resolve(process.cwd(), source);
  target = path.resolve(process.cwd(), target);

  console.log('Recursively watching', source, 'for changes.')
  traverseAndWatch(source);

  function traverseAndWatch(p) {
    var stat = fs.statSync(p);

    if (path.basename(p)[0] == '.' || path.basename(p) == 'images' ||
      _.contains(['.png', '.jpg', '.jpeg', 'gif'], path.extname(p))) {
      return;
    }

    if (stat.isFile()) {
      copy(p);
      fs.unwatchFile(p);
      fs.watchFile(p, function () {
        var now = new Date();
        var h = now.getHours();
        var m = now.getMinutes();
        var s = now.getSeconds();
        console.log('[%s:%s:%s] copying file %s', h, m, s, p);
        copy(p)
      });
    }
    else if (stat.isDirectory()) {
      var files = fs.readdirSync(p);
      _.each(files, function (file) {
        traverseAndWatch(path.resolve(p, file));
      });
    }
  }

  function copy(file) {
    var relativePath = path.relative(source, file);
    var targetLocation = path.resolve(target, relativePath);
    var targetDir = path.dirname(targetLocation);

    var sourceFile = fs.readFileSync(file, 'utf-8');
    if (!fs.existsSync(targetDir)) {
      console.log(targetLocation);
      console.log(targetDir);
      console.log(fs.existsSync(targetDir));

      fs.mkdirSync(targetDir, 777, true);
    }
    fs.writeFileSync(targetLocation, sourceFile, 'utf-8');
  }
}
