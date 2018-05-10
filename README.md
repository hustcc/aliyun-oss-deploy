# aliyun-oss-deploy

> 一个用于部署静态资源到 aliyun oss 的模块，支持 putObject 和 stream。可以代码方式或者 cli 方式调用！

[![Build Status](https://travis-ci.org/hustcc/aliyun-oss-deploy.svg?branch=master)](https://travis-ci.org/hustcc/aliyun-oss-deploy)
[![Coverage Status](https://coveralls.io/repos/github/hustcc/aliyun-oss-deploy/badge.svg?branch=master)](https://coveralls.io/github/hustcc/aliyun-oss-deploy)
[![npm](https://img.shields.io/npm/v/aliyun-oss-deploy.svg)](https://www.npmjs.com/package/aliyun-oss-deploy)
[![npm](https://img.shields.io/npm/dm/aliyun-oss-deploy.svg)](https://www.npmjs.com/package/aliyun-oss-deploy)


## Install

```bash
npm i --save-dev aliyun-oss-deploy
```


## Usage

 - 代码方式

```js
const deploy = require('aliyun-oss-deploy');

deploy(path, ossConfig);
```


 - CLI 方式

```bash
aliyun-oss-deploy -p ./dist -c .aliossrc
```

> 其中 -p c 参数是指定 oss 配置文件路径，不传则默认为当前目录的 `.aliossrc` 文件。

可以在 package.json 中直接使用

```json
{
  "script": {
    "deploy": "aliyun-oss-deploy -p ./dist"
  }
}
```


## Config

> 无论是代码方式还是 cli 方式，aliyun oss 配置文件都是下面的数据结构！

**需要注意的是**：对于 CLI 方法，配置文件必须是 JSON 格式（双引号）！


```js
{
  "accessKeyId": "your accessKeyId",
  "accessKeySecret": "your accessKeySecret",
  "endpoint": "your endpoint",
  "bucket": "your bucket",
  "bucketPath": "your bucketPath"
}
```


## License

ISC@[hustcc](https://github.com/hustcc).
