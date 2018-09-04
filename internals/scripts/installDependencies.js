#!/usr/bin/env node
/* eslint-disable */

// Install dependencies before start server
var shelljs = require('shelljs');

if (!shelljs.which('yarn')) {
  shelljs.exec('npm install');
} else {
  shelljs.exec('yarn');
}
