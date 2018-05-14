# aliyun-oss-deploy

> 一个用于部署静态资源到 aliyun oss 的模块，支持 putObject 和 putStream。可以代码方式或者 cli 方式调用！

[![npm](https://img.shields.io/npm/v/aliyun-oss-deploy.svg)](https://www.npmjs.com/package/aliyun-oss-deploy)
[![npm](https://img.shields.io/npm/dm/aliyun-oss-deploy.svg)](https://www.npmjs.com/package/aliyun-oss-deploy)

![image](https://user-images.githubusercontent.com/7856674/39998106-a1fba014-57b7-11e8-8c15-3dc662bd5a10.png)

## Install

```bash
npm i --save-dev aliyun-oss-deploy
```


## Usage

 - 代码方式

```js
const deploy = require('aliyun-oss-deploy');

deploy(path, ossConfig[, prefix, byStream]);
```

**注意**：prefix 用来配置资源版本号比较合适，默认为空；byStream 默认为 false，表示使用 putObject 方法！


 - CLI 方式

```bash
aliyun-oss-deploy -p ./dist -c .aliossrc -d static
```

帮助文档：

```bash
aliyun-oss-deploy --help
Options:
  --version        Show version number           [boolean]
  -p, --filePath   Set your upload files path     [string]
  -d, --prefix     Set the target dir of upload   [string]
  -c, --aliossrc   Set your .aliossrc file path   [string]
  -s, --useStream  Upload file by putStream      [boolean]
  --help           Show help                     [boolean]
```


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
  "region": "your region",
  "bucket": "your bucket"
}
```

**注意**：`region` 是区分 endpoint 的区域分类。


## License

ISC@[hustcc](https://github.com/hustcc).
