'use strict';

const co = require('co');
const fs = require('fs');
const path = require('path');
const Electron = require('macaca-electron');

const electron = new Electron();

co(function *() {
  yield electron.startDevice({
    window: false // in silence
  });
  yield electron.maximize();
  yield electron.setWindowSize(null, 500, 500);
  yield electron.get('https://www.baidu.com');
  const imgData = yield electron.getScreenshot();
  const img = new Buffer(imgData, 'base64');
  const p = path.join(__dirname, '..', 'screenshot.png')
  fs.writeFileSync(p, img.toString('binary'), 'binary');
  console.log(`screenshot: ${p}`);
  yield electron.stopDevice();
});
