---
title: python scripts
author: liuzh
time: 2023-10-31
tag: 
 - python
---

## python 脚本的问题记录

### 1. 使用 `df[['column1','column2']]` 获取指定列，后续操作会有警告
```
A value is trying to be set on a copy of a slice from a DataFrame. Try using .loc[row_indexer,col_indexer] = value instead
应该用 df.loc[:,['column1','column2']] 获取需要的列
```
