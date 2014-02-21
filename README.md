# Starter kit

Essential files and tools to start a project from scratch.

## Files structure

## Workspace

To use Starter kit you should install Sass, Node.js and Grunt on your computer.
We use Grunt to automate tasks: compiling, validation, copressing images, html includes.
__Note that all files in "build" folder are generated automatically with grunt. Don't change anything in this folder.__
"build" folder is ignored by git. All changes should be done in "src" folder. It contains all source file to work with.

* Install node.js ( Linux )
```shell
sudo apt-get update
sudo apt-get install python-software-properties python g++ make
sudo add-apt-repository ppa:chris-lea/node.js
sudo apt-get update
sudo apt-get install nodejs
```
* Install Grunt CLI
    `sudo npm install -g grunt-cli`
* In project root folder run
    `sudo npm install`
* It's ready to use, after each git pull run command "grunt build" in project root to update build folder
* If you haven't installed sass & ruby do next:
```shell
sudo apt-get install ruby
gem install sass
```
