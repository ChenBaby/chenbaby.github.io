---
title: nodejs下request模块中文gb2312乱码问题
date: 2018-12-10 13:01:38
tags: NodeJS
---
在用node写一个爬虫程序时，对格式为GB2312的网页进行转码
使用iconv-lite解决node当中不支持GBK编码的问题
<!-- more -->
使用nodejs的request包请求中文gb2312网页时会乱码，默认：
```
var request = require('request');
request(url, function(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body);
    }
});
```

Node.js内置模块是没有转码工具的，这个时候我们就要用第三方中间件iconv-lite来进行转码
```
var request = require('request');
var Iconv = require('iconv-lite');
request({
    encoding: null,
    url: url
}, function(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(Iconv.decode(body, 'gb2312').toString());
    }
});
```
电影爬虫小程序：
https://github.com/ChenBaby/worm