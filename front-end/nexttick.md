---
title: Vue获取数据渲染完成事件
author: liuzh
time: 2020-06-24
tag: 
 - vue
---

## Vue 获取数据渲染完成事件
问题：调用后台接口给表单元素赋值，然后自动提交表单，报错 cannot post  
原因：表单元素绑定的数据还没有渲染完成，就提交了表单  
解决：`this.$nextTick(callback)` 当 dom 发生变化，更新后执行回调函数
```javascript
this.$nextTick(() => {
    //在这个方法内提交表单
});
```