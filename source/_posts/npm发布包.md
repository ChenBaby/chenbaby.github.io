---
title: npm发布包
date: 2018-12-16 14:03:41
tags: npm
---
npm发布一个包，可供npm全局下载
npm i chenbaby-translate -g
<!-- more -->
### 功能文件
translate.js，放在bin目录下
```
#!/usr/bin/env node

...
```
命令代码都是写在bin目录下，需要在配置文件package文件中启用命令,添加一个配置项bin
```
"bin": {
    "translate": "./bin/translate.js"
}
// translate这里配置的属性名将是包被全局
```
安装后使用的命令名称
### 发布npm包
首先在项目根目录执行npm登陆
```
npm login 

npm publish
```
**注意：**如果之前配置了config为cnpm地址，需要把npm仓库设置回来

```
npm config set registry https://registry.npmjs.org/
```
每一次更新npm包，版本号需要大于上一次