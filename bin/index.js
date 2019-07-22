#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const assert = require('./assert');
const log = require('./log.js');
const deploy = require('../index.js');

const deployGenerator = deploy.deployGenerator;

/**
 * 命令行参数配置
 */
const argv = require('yargs')
  .option('p', {
    describe: 'Set your upload files path',
    type: 'string',
    alias: 'filePath',
  })
  .option('d', {
    describe: 'Set the target dir of upload',
    type: 'string',
    alias: 'prefix',
  })
  .option('c', {
    describe: 'Set your .aliossrc file path or JSON string',
    type: 'string',
    alias: 'aliossrc',
  })
  .option('s', {
    describe: 'Upload file by putStream',
    type: 'boolean',
    alias: 'useStream',
  })
  .help()
  .argv;

// 校验路径
assert(argv.filePath, 'argv -p should be required.');

// oss 配置文件
const aliossrc = argv.aliossrc ? path.resolve(argv.aliossrc) : path.join(process.cwd(), '.aliossrc');

let ossConfig;
// 文件存在则直接读取
try {
  if (fs.existsSync(aliossrc)) {
    ossConfig = JSON.parse(fs.readFileSync(aliossrc, {
      encoding: 'utf8',
    }));
  } else {
    ossConfig = JSON.parse(argv.aliossrc);
  }
} catch (e) {
  assert(false, `ossConfig '${aliossrc}' is not a valid JSON file.`)
}


// 校验配置
assert(ossConfig.region, `region is required in ${aliossrc}.`);
assert(ossConfig.accessKeyId, `accessKeyId is required in ${aliossrc}.`);
assert(ossConfig.accessKeySecret, `accessKeySecret is required in ${aliossrc}.`);
assert(ossConfig.bucket, `bucket is required in ${aliossrc}.`);

const dg = deployGenerator(argv.filePath, ossConfig, argv.prefix, argv.useStream);

log(dg);
