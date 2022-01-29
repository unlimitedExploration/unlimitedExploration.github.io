---
title:  Spring Boot 支持 Https
author: liuzh
time: 2020-12-16
tag: 
 - spring boot
---

## 1. 生成证书
进入到`%JAVA_HOME%\bin`目录下，执行命令
```
keytool -genkey -alias test -dname "CN=CommonName,OU=OrganizationUnit,O=Organization,L=Locality,ST=State,C=CN" -storetype PKCS12 -keyalg RSA -keysize 2048 -keystore test.p12 -validity 3650
```
各参数的含义
- alias key的别名
- dname 证书拥有者信息
    - CN 名字与姓氏
    - OU 组织单位
    - O 组织
    - L 城市或区域
    - ST 州或省份
    - C 国家
- storetype 密钥库的类型，默认是JKS
- keyalg 密钥的算法
- keysize 密钥的长度
- keystore 证书名称
- validity 证书有效期（天）

## 2. Spring Boot 项目配置
把生成的证书文件复制到项目的`resources`目录下，然后修改配置文件：
```
server:
  port: 8080
  ssl:
    key-store: classpath:test.p12
    key-store-type: PKCS12
    key-store-password: 111111
    key-alias: test
```
配置完成后再启动项目，就可以使用 https 访问了

## 3. 遇到的问题
### 3.1 项目启动报错：`java.lang.IllegalArgumentException: DerInputStream.getLength(): 111, too big.`
解决方法：在pom文件中增加配置
```xml
<plugin>
  <groupId>org.apache.maven.plugins</groupId>
  <artifactId>maven-resources-plugin</artifactId>
  <configuration>
    <nonFilteredFileExtensions>
      <nonFilteredFileExtension>p12</nonFilteredFileExtension>
    </nonFilteredFileExtensions>
  </configuration>
</plugin>
```

## 4. 参考链接
- [http://www.javaboy.org/2019/0813/springboot-https.html](http://www.javaboy.org/2019/0813/springboot-https.html)
- [https://zhuanlan.zhihu.com/p/31385073](https://zhuanlan.zhihu.com/p/31385073)
- [https://blog.csdn.net/yhl_woniu/article/details/80173266](https://blog.csdn.net/yhl_woniu/article/details/80173266)
