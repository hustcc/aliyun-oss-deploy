/**
 * Created by hustcc on 18/5/10.
 * Contract: i@hust.cc
 */

const fs = require('fs');
const path = require('path');

const co = require('co');
const OSS = require('ali-oss');
const globby = require('globby');

const fileList = filePath =>
  fs.statSync(filePath).isFile() ? [ filePath ] : globby.sync([ '**/*.*' ], { cwd: filePath });


/**
 * 使用 putObject 上传
 * @param client
 * @param ossTarget
 * @param stream
 */
const uploadByPutObject = async (client, ossTarget, stream) => {
  return await co(function*() {
    return Promise.resolve(
      yield client.put(ossTarget, stream),
    );
  });
};

/**
 * 使用 putStream 上传
 * @param client
 * @param ossTarget
 * @param stream
 */
const uploadByPutStream = async (client, ossTarget, stream) => {
  return await co(function*() {
    return Promise.resolve(
      yield client.putStream(ossTarget, stream),
    );
  });
};

/**
 * 上传文件的 generator
 * @param filePath
 * @param config
 * @param prefix
 * @param byStream
 */
const deployGenerator = function* (filePath, config, prefix, byStream) {
  filePath = filePath && path.resolve(filePath);
  prefix = prefix || '';

  const client = new OSS(config);

  // 获得文件列表，并添加相对目录
  const files = fileList(filePath);
  const func = byStream ? uploadByPutStream : uploadByPutObject;

  const r = [];

  for (const file of files) {
    const ossTarget = path.join(prefix, file);
    // stream
    const stream = fs.createReadStream(path.join(filePath, file));

    // 使用 oss 上传文件 file 到 targetFile
    const result = yield func(client, ossTarget, stream);

    r.push(result);
  }
  return r;
};

/**
 * 入口方法
 * @param filePath 上传的文件目录
 * @param config aliyun oss 配置内容
 * @param prefix 上传到 oss 的批量文件前缀，可以用于做版本号
 * @param byStream 默认是 putObject
 */
module.exports = async (filePath, config, prefix, byStream) => {
  return await co(function*() {
    return Promise.resolve(
      yield deployGenerator(filePath, config, prefix, byStream),
    );
  });
};

module.exports.deployGenerator = deployGenerator;
