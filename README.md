# Starter kit

Essential files and tools to start a project from scratch.

## Workspace

We use Grunt to automate tasks: compiling, validation, copressing images, html includes.
__Note that all files in "build" folder are generated automatically with grunt. Don't change anything in this folder.__
"build" folder is ignored by git. All changes should be done in "src" folder. It contains all source file to work with.

1. Install node.js ( Linux )
```bash
    sudo apt-get update
    sudo apt-get install python-software-properties python g++ make
    sudo add-apt-repository ppa:chris-lea/node.js
    sudo apt-get update
    sudo apt-get install nodejs
```
2. Install Grunt CLI
    `sudo npm install -g grunt-cli`
3. In project root folder run
    `sudo npm install`
4. It's ready to use, after each git pull run command "grunt build" in project root to update build folder
5. If you haven't installed sass & ruby do next:
```bash
    sudo apt-get install ruby
    gem install sass
```
