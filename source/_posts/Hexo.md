---
title: Hexo 搭建博客
date: 2018-06-07 12:21:13
tags: 博客
---
Hexo 搭建个人博客并部署到Github
Hexo 换主题
<!-- more -->

### 简单命令
```
hexo clean #清除缓存
hexo g == hexo generate#生成静态页面到public目录
hexo s == hexo server #启动服务预览
hexo d == hexo deploy#部署
hexo new "postName" #新建文章
hexo new page "pageName" #新建页面
```
### 简单命令
#### 安装
`npm install -g hexo-cli`
#### 初始化hexo
```
hexo init blog
hexo install   # 安装依赖包
```
### 本地预览
`hexo s # 等同于hexo server，在本地服务器运行`
打开浏览器地址栏输入：http://localhost:4000/ 便可以预览生成的博客框架雏形了。
### 发布文章
默认是以post作为模板
`hexo new "文章名字"`
该命令会自动新建一个文件“文章名.md”

或者直接在根目录的source文件夹的_posts文件夹下直接新建一个md文件

下面是一个标准的文章格式：
```
---
title: 文章标题
date: 文章创建日期
categories: 文章分类
tags:
  - 文章标签1
  - 文章标签2
  - ...
---

在<!-- more -->之前编写文章的摘要内容！！！

<!-- more -->

在<!-- more -->之后编写文章的正式内容！！！
```
### 生成页面
`hexo new page XXX //以page 作为模版,会自动生成里面的index.md`
#### 生成标签页面：
```
hexo new page tags
```
修改标签归档页面的markdown文件(文件路径：your-blog/source/tags/index.md)的内容：
```
---
title: tags
date: <!-- 自动生成，无需修改 -->
type: "tags"
categories:
tags:
---
```
注：type字段的值是`tags`

#### 生成分类页面：
```
hexo new page categories
```
修改分类归档页面的markdown文件(文件路径：your-blog/source/categories/index.md)的内容：
```
---
title: categories
date: <!-- 自动生成，无需修改 -->
type: "categories"
categories:
tags:
---
```
注：type字段的值是`categories`

### 部署到服务器
`hexo deploy`
这里主要介绍部署到Github上面

在github上面先建立仓库，仓库名格式必须为{user_name}.github.io，其中{user_name}必须与你的用户名一样。

至于我们如何让本地git项目与远程的github建立联系呢？见[Github仓库部署](https://chenbaby.github.io/articles/2018-12-09-git/)</a>
完成上面的建立，接下来安装一个部署扩展
`npm install hexo-deployer-git --save`

#### 配置 Deployment
在项目根目录下找到_config.yml文件，找到Deployment

```
# Deployment
## Docs: https://hexo.io/docs/deployment.html
deploy:
  type: git
  repo: git@github.com:ChenBaby/chenbaby.github.io.git
  branch: master
```
### 更换主题
#### 下载主题代码
```
cd your-blog/
git clone git@github.com:dongyuanxin/theme-bmw.git themes/bmw
```
把自己想要替换的主题的git文件包放到themes目录下

#### 修改HEXO配置文件
修改hexo的配置文件：your-blog/_config.yml:
```
# Site
title: 您自己的网站标题
subtitle: # 不需要填写
description: 您自己的网站描述
keywords: 您自己的网站关键词
author: 您的姓名
language: zh-Hans
timezone: # 不需要填写
...
theme: bmw
```
#### 修改主题配置文件
theme-bmw 的配置文件：`your-blog/themes/bmw/_config.yml`
可以根据自己需要去更改网站其他配置，例如自定义导航栏：

```
# 导航栏头部名称
nav_name: ChenBaby's Blog
# 导航栏选项
# blank: 是否在新页面打开，默认 false
# children：开启二级导航栏
nav: 
  - 
    name: 主页
    path: /
  -
    name: 归档
    path: /archives/
  -
    name: 分类
    path: /categories/
  -
    name: 标签
    path: /tags/
  - 
    name: Github
    path: "https://github.com/ChenBaby"
```
站点配置文件和主题配置文件名称都是一样的_config.yml，站点配置文件在网站根目录，主题配置文件在根目录下的theme文件的具体theme下的_config.yml。

### 使用markdown语法编好文章
依据markdown语法编好文章，以及部署本地文件到github后，那么就可以使用命令：`hexo g -d`同步到github

然后使用https://chenbaby.github.io进行访问