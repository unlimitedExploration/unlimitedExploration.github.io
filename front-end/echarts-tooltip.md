---
title: 使用 ECharts 折线图遇到的问题
author: liuzh
time: 2020-08-06
tag: 
 - echarts
---

## 1. echarts 折线图自定义 tooltip 显示
问题：从后台接口获取数据给折线图的 dataset，字段名都是英文，所以在默认的提示框（tooltip）中显示的提示也带有英文名的字段  
解决：可通过 tooltip 的配置项 formatter 来自定义提示框内容  
```javascript
tooltip: {
    trigger: 'axis',
    formatter: function(params) {
        var name = params[0].name
        var value = params[0].value.total_amount
        return name + '<br/>交易金额:' + value
    }
},
```