#Requirements:
Node.js
http://nodejs.org/download/

#To install:
```
$ git clone git@github.com:autoric/liveedit.git 
$ cd liveedit
$ npm install -g .
```

Live edit tool should now be availabe on your path as `ledit`

#Usage:
This is a simple tool that allows you to edit the static files (html, css, js) in the source for your tomcat project, and it will automatically copy those changes to the deployed webapp. Written for my work on rave - maybe useful elsewhere.

`$ ledit [source] [destination]`
 - [source] file path of directory to watch and copy files from. Defaults to rave-portal-resources/src/main/webapp/static/
 - [destination] file path of directory to copy files to. Defaults to rave-portal/target/tomcat6x/webapps/portal/static/

If you dont want to type paths over and over, you can configure defaults.

`$ ledit config --source <path> --target <path>`
This will write a .ledit.json configuration file to the current directory, and will use these default values when you run the ledit command from that directory without source / destination args.

#Caveats
 - Uses node's fs.watchFile api. This implementation differes across platforms. It works well for me on mac os X, you might have issues on other OS's.
 - Only watches currently existing files - will not catch creation of new files or directories. However `ledit` automatically copies all files over at runtime, so you can just ctrl-C and restart the process to capture new files.
 - Ignores files that end with an image extension or dotfiles / directories.
 - I have seen it crash sometimes when you create new files or directories under the source directory. If it annoys you fix it and submit pull request! Otherwise just rerun ledit and it will copy the new files to the destination.
