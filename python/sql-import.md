---
title: 连接数据库导入
author: liuzh
time: 2024-03-29
tag: 
 - python
---

## 连接 `sqlserver` 数据库导入表格数据
```python
# -*- coding: utf-8 -*-

import pandas as pd
#import datetime
from datetime import datetime,timedelta
import pymssql

#昨天的日期
yesterday = datetime.now() - timedelta(days=1)
df = pd.read_excel('./商户号-%s.xlsx' % yesterday.strftime('%m%d'),dtype=str)

#加一列ID
df.loc[:,"ID"] = df.index + 1

#连接sqlserver数据库
conn = pymssql.connect('127.0.0.1','sa','mypassword','database')
if conn:
    print("数据库连接成功！")
    cursor = conn.cursor()
    #删除表中原来的数据
    cursor.execute("truncate table dbo.临时_商户号终端号")
    #导入数据
    list1 = []
    for x in df.index:
        t = ('%s' % df.loc[x,'商户号'].strip(),'%d' % df.loc[x,'ID'])
        #t = ('%s' % df.loc[x,'商户号'],'%s' % df.loc[x,'终端号'],'%d' % df.loc[x,'ID'])
        #print(t)
        list1.append(t)
    print("读取表格数据: %d" % len(list1))
    insertsql = "insert into dbo.临时_商户号终端号(商户号,ID) values(%s,%d)"
    cursor.executemany(insertsql,list1)
    conn.commit()
    cursor.execute("select count(*) from dbo.临时_商户号终端号")
    res = cursor.fetchone()[0]
    print("成功导入数据: %d" % res)
    conn.close()
```