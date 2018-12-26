---
title: Vue组件间通信
date: 2018-12-07 12:37:40
tags: Vue
---
Vue可以通过eventBus以及Vuex来实现兄弟组件间通信
<!-- more -->

### 事件总线（eventBus）
全局bus、事件触发提交(emit)、事件监听(on)、监听移除($off)

注意：
第一是$bus.on应该在created钩子内使用，如果在mounted使用，它可能接收不到其他组件来自created钩子内发出的事件；

第二点是使用了bus.on，在beforeDestory钩子里应该需要使用bus.off解除，因为组件销毁后，就没有必要把监听的句柄存储在vue-bus里面了

### VUEX

### Watch
#### watch一个对象, 用deep深度监听对象的属性变化
```
watch: {
	user: {
		handle: function (newval, oldval) {
			console.log(newval, oldval)		
},
deep: true
}
}
```
监听器会一层层的往下遍历，给对象的所有属性都加上这个监听器，但是这样性能开销就会非常大了，任何修改obj里面任何一个属性都会触发这个监听器里的 handler。

可以使用字符串形式监听对象里面的某一属性
```
watch: {
  'obj.a': {
    handler(newName, oldName) {
      console.log('obj.a changed');
    }
  }
}
```
**immediate代表在wacth里声明了firstName这个方法之后立即先去执行handler方法**
```
watch: {
  firstName(newName, oldName) {
    this.fullName = newName + ' ' + this.lastName;
  }
}
```
这里 watch 的一个特点是，最初绑定的时候是不会执行的，要等到 firstName 改变时才执行监听计算。那我们想要一开始就让他最初绑定的时候就执行改怎么办呢？
```
watch: {
  firstName: {
    handler(newName, oldName) {
      this.fullName = newName + ' ' + this.lastName;
    },
    immediate: true
  }
}
```
而immediate:true代表如果在 wacth 里声明了 firstName 之后，就会立即先去执行里面的handler方法，如果为 false就跟我们以前的效果一样，不会在绑定的时候就执行。

#### 注销watch
以上的watch写在组件的选项中，会随着组件的销毁而注销，但是以下形式注册的监听需要手动注销：
```
const unWatch = vm.$watch('text', (newVal, oldVal) => {
  console.log(`${newVal} : ${oldVal}`);
})
unWatch(); // 手动注销watch
```
vm.$watch 返回一个取消观察函数，用来停止触发回调：就是unWatch方法，你要注销 watch 只要调用unWatch方法就可以了。