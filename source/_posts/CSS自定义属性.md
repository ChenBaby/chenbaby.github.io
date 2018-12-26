---
title: CSS自定义属性
date: 2018-12-14 13:57:40
tags: Css
---
`--custom-property: value`
在自定义属性前添加双横线前缀，然后像给普通CSS设值一样，给自定义属性设值。
<!-- more -->

### Css Custom Properties（Css变量）
定义：
`--custom-property: value`
在自定义属性前添加双横线前缀，然后像给普通CSS设值一样，给自定义属性设值。

> CSS自定义属性是区分大小写的

使用：
`var(--custom-property, 默认值)`

> 如果是语法错误，将会直接视为无效，但无效的var()将会被该属性的初始值或继承值替代

可根据浏览器是否支持判断使用
```
@support(--css: variables) {
    :root {
        xxx: var(--custom-property)
    }
}
//:root选择器可以选择到DOM元素中或document树中最高顶级的元素。
//因此，在:root选择器是声明的CSS自定义属性，其作用域的范围是全局范围，也就是全局作用域。
```
可以在@media或其他条件规则中更改CSS自定义属性的值。
```
:root {
    --gutter: 10px;
}

@media screen and (min-width: 768px) {
    --gutter: 30px;
}
```
可以选择在内联样式中声明CSS自定义属性
```
<!--HTML-->
<html style="--color: red">

<!--CSS-->
body {
    color: var(--color)
}
```
优点：
可读性和可维护性、易于修改多处引用