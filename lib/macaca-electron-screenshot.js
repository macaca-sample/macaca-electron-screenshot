'use strict';

const co = require('co');
const fs = require('fs');
const path = require('path');
const Electron = require('macaca-electron');

const pkg = require('../package');

const electron = new Electron();

co(function *() {
  yield electron.startDevice();
  yield electron.get(pkg.homepage);
  yield electron.maximize();

  const imgData = yield electron.getScreenshot();
  const img = new Buffer(imgData, 'base64');

  fs.writeFileSync(path.join(__dirname, '..', 'screenshot.png'), img.toString('binary'), 'binary');
});
