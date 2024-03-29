---
title: 生成树形结构
author: liuzh
time: 2024-03-29
tag: 
 - python
---

## 使用 pandas 的 groupby 方法生成树形结构
```python
# -*- coding: utf-8 -*-

import pandas as pd
import json

#读取B列到D列（州市|区县|网点） 跳过前三行标题行
df = pd.read_excel('./副本网点信息-20230125.xlsx',header=None,usecols='B:D',skiprows=[0,1,2])

#先按州市分组
df_level1 = df.groupby(df[1],as_index=False)
data_list = []
for key1,value1 in df_level1:
    #print(key1)
    #再按县分组
    group2 = value1.groupby(value1[2],as_index=False)
    data_dict1 = {
        "text": key1,
        #"value": key1
    }
    children = []
    for key2,value2 in group2:
        #print(key2,value2)
        data_dict2 = {
            "text": key2,
            #"value": key2
        } 
        #print(value2.loc[:,3])
        #list3 = value2.loc[:,3].to_list()
        children2 = []
        for item in value2.loc[:,3].to_list():
            data_dict3 = {
                "text": item,
                #"value": item
            }
            children2.append(data_dict3)
        data_dict2.update({"children": children2})
        children.append(data_dict2)
    data_dict1.update({"children": children})
    data_list.append(data_dict1)

#print(data_list)
json_str = json.dumps(data_list,ensure_ascii=False)
print(json_str)
```