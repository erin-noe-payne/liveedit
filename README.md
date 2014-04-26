#Requirements:
Node.js
http://nodejs.org/download/

#To install:
npm install -g .

#Usage:
This is a simple tool that allows you to edit the static files (html, css, js) in the source for your tomcat project, and it will automatically copy those changes to the deployed webapp. Written for my work on rave.

It doesn't copy images.

```$ ledit [source] [destination]```
 - [source] file path of directory to watch and copy files from. Defaults to rave-portal-resources/src/main/webapp/static/
 - [destination] file path of directory to copy files to. Defaults to rave-portal/target/tomcat6x/webapps/portal/static/

If you dont want to type paths over and over, you can configure defaults.
```ledit config --source <path> --target <path>```
This will write a .ledit.json configuration file to the current directory, and will use these default values when you run the ledit command.

 By default this expects to copy files from the static content source directory of a rave project to the running webapp. So in most cases you can just do this:
 $ cd /path/to/my/src/rave
 $ ledit

 #Gotchas
 Might crash when you create new files or directories under the source directory. If it annoys you fix it and submit pull request. Otherwise just rerun ledit and it will copy the new files to the destination.
