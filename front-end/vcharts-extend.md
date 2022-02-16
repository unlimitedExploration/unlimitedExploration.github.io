---
title: 使用 v-charts 遇到的问题
author: liuzh
time: 2020-09-17
tag: 
 - v-charts
---

## 1. 横轴标签内容过长导致显示不全
```html
<!-- 配置extend属性 -->
<ve-histogram :data="chartData" :settings="chartSettings" :extend="extend" height="100%"></ve-histogram>
```
```javascript
this.extend = {
    //x轴文本倾斜
    'xAxis.0.axisLabel.rotate': '60'
}
```