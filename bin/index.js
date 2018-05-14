#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { h, render } = require('ink');
const assert = require('assert');

const DeployComponent = require('./Deploy.js');

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
    describe: 'Set your .aliossrc file path',
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
assert(argv.filePath, 'argv -p should be required');

// oss 配置文件
const aliossrc = argv.aliossrc && path.resolve(argv.aliossrc) || path.join(process.cwd(), '.aliossrc');

const ossConfig = JSON.parse(fs.readFileSync(aliossrc, {
  encoding: 'utf8',
}));

// 校验配置
assert(ossConfig.region, `region is required in ${aliossrc}`);
assert(ossConfig.accessKeyId, `accessKeyId is required in ${aliossrc}`);
assert(ossConfig.accessKeySecret, `accessKeySecret is required in ${aliossrc}`);
assert(ossConfig.bucket, `bucket is required in ${aliossrc}`);

const dg = deployGenerator(argv.filePath, ossConfig, argv.prefix, argv.useStream);

let unmount;

const onExit = () => {
  unmount();
  process.exit(0);
};

// render ink component
unmount = render(h(DeployComponent, { dg, onExit }));
