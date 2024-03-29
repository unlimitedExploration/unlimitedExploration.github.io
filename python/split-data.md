---
title: 拆分表格数据
author: liuzh
time: 2024-03-29
tag: 
 - python
---

## #按指定行数拆分成多个表格文件
```python
# -*- coding: utf-8 -*-

import pandas as pd
import datetime
import pymssql

a = 1
n = 80000 #每个文件的行数
row_num = df.shape[0] #获取总行数
row_list = []
#range(start, stop[, step]) 返回object
for i in list(range(80000,row_num,80000)):
    row_list.append(i)
row_list.append(row_num)

print(row_list)
for m in row_list:
    filename = './交易记录-20220501-1030-' + str(a) + '.xlsx'
    if m < row_num:
        df_handle = df.iloc[m-80000:m]
        df_handle.to_excel(filename,index=0)
    elif m == row_num:
        remainder = row_num % 80000
        df_handle = df.iloc[m-remainder:m]
        df_handle.to_excel(filename,index=0)
    a += 1
```