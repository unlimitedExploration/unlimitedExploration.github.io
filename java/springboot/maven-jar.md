---
title:  maven 引入本地 jar
author: liuzh
time: 2020-09-29
tag: 
 - maven
---

## 在`pom.xml`文件中引入

1. 在项目根目录下新建`lib`文件夹用于存放本地jar文件;
2. 编辑`pom.xml`:
```xml
<dependency>
    <groupId>自定义</groupId>
    <artifactId>自定义</artifactId>
    <version>自定义</version>
    <scope>system</scope>
    <systemPath>${project.basedir}/lib/jar文件名</systemPath>
</dependency>
```
3. 打包时需要配置`pom.xml`:
```xml
<build>
    <resource>
        <!-- 如果打包后找不到 spring-boot 项目的配置文件，如下配置 -->
        <directory>src/main/resources</directory>
    </resource>
    <resource>
        <!-- 指定lib文件夹的位置 -->
        <directory>lib</directory>
        <!-- 打包到/BOOT-INF/lib目录下 -->
        <targetPath>/BOOT-INF/lib/</targetPath>
        <includes>
            <include>**/*.jar</include>
        </includes>
    </resource>
</build>
```