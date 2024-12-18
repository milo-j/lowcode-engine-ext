#!/usr/bin/env node
const http = require('http');
const package = require('../package.json');

const { version, name } = package;
const options = {
  method: 'PUT',
  // 暂时使用 日常环境的 uipaas-node，上线后可切换成线上环境 https://uipaas-node.alibaba-inc.com
  hostname: 'uipaas-node.alibaba.net',
  path: '/staticAssets/cdn/packages',
  headers: {
    'Content-Type': 'application/json',
    Cookie: 'locale=en-us',
  },
  maxRedirects: 20,
};

const onResponse = function (res) {
  const chunks = [];
  res.on('data', (chunk) => {
    chunks.push(chunk);
  });

  res.on('end', () => {
    const body = Buffer.concat(chunks);
    console.table(JSON.stringify(JSON.parse(body.toString()), null, 2));
  });

  res.on('error', (error) => {
    console.error(error);
  });
};

const req = http.request(options, onResponse);

const postData = JSON.stringify({
  packages: [
    {
      packageName: name,
      version,
    },
  ],
  // 可以发布指定源的 npm 包，默认公网 npm
  useTnpm: false,
});

req.write(postData);

req.end();
