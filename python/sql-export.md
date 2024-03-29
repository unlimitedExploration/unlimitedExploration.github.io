---
title: 连接数据库查询导出
author: liuzh
time: 2024-03-29
tag: 
 - python
---

## 连接 `sqlserver` 数据库查询并导出含多个 sheet 的表格
```python
# -*- coding: utf-8 -*-

import pandas as pd
#import datetime
from datetime import datetime,timedelta
import pymssql

start_date = '20220101'
end_date = '20221231'
file_date = datetime.strptime(end_date,'%Y%m%d') - timedelta(days=1)
#连接sqlserver数据库
conn = pymssql.connect('127.0.0.1','sa','mypassword','database')
if conn:
    print("数据库连接成功！")
    cursor = conn.cursor()
    #sql语句中有字符串替换%s时，模糊查询中用%%表示%
    querysql1 = """select ... from table where 交易类型 like  N'%%套餐%%'
and (清算日期 >= '%s' and 清算日期 < '%s'""" % (start_date,end_date)
    
    df1 = pd.read_sql(querysql1,conn)
    # ...
    with pd.ExcelWriter('./交易统计_%s-%s.xlsx' % (start_date,file_date.strftime('%Y%m%d'))) as writer:
        df1.to_excel(writer,sheet_name="Sheet1",index=0)
        df2.to_excel(writer,sheet_name="Sheet2",index=0)
        df3.to_excel(writer,sheet_name="Sheet3",index=0)
    
    conn.close()
```