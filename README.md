# Starter kit

Essential files and tools to start a project from scratch.

## Working directory

We use Grunt to automate tasks: compiling, validation, copressing images, html includes.
Changes should be done in "src" folder as it contains all source file to work with.
Note that "build" folder is generated automatically by Grunt and ignored by git.

## Install Grunt

To use this kit you should install Node.js and Grunt on your computer.

* Install node.js ( Linux )
```
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

## Grunt commands

* build
* start
* validate
* html
* css
* img