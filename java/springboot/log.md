---
title:  Spring Boot 日志配置
author: liuzh
time: 2020-09-30
tag: 
 - slf4j
---

## 1. resources 目录下新建配置文件`logback-spring.xml`
```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <!-- %date-日期 %thread-线程名 %-5level-级别从左显示5个字符宽度 %logger{36}-名字最长36个字符 %msg-日志消息 %n-换行符 -->
    <property name="LOG_PATTERN" value="%date{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n" />
    <!-- 开发环境 对应配置文件 application-dev.yml -->
    <springProfile name="dev">
        <!-- %i-第i个文件 当文件达到指定大小时会将日志生成到新的文件 日志保存路径要使用绝对路径 -->
        <property name="FILE_PATH" value="D:/lzh/study/logs/notify/notify.%d{yyyy-MM-dd}.%i.log" />
    </springProfile>
    <!-- 生产环境 对应配置文件 application-prod.yml -->
    <springProfile name="prod">
        <property name="FILE_PATH" value="/home/projects/logs/notify/notify.%d{yyyy-MM-dd}.%i.log" />
    </springProfile>

    <!--  控制台输出  -->
    <appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>${LOG_PATTERN}</pattern>
        </encoder>
    </appender>

    <!-- 输出到文件 -->
    <appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <!-- 用日期作为文件名 -->
            <fileNamePattern>${FILE_PATH}</fileNamePattern>
            <!-- 日志保存15天 -->
            <!-- <maxHistory>15</maxHistory> -->
            <timeBasedFileNamingAndTriggeringPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedFNATP">
                <!-- 单个日志文件最大容量，超过则新建日志文件存储 -->
                <maxFileSize>10MB</maxFileSize>
            </timeBasedFileNamingAndTriggeringPolicy>
        </rollingPolicy>

        <encoder>
            <pattern>${LOG_PATTERN}</pattern>
        </encoder>
    </appender>

    <!-- 日志级别从低到高 trace debug info warn error -->
    <logger name="com.example.notify" level="INFO" />
    <root level="INFO">
        <appender-ref ref="CONSOLE" />
        <appender-ref ref="FILE" />
    </root>
</configuration>
```

## 2. 在 spring boot 配置文件中配置
- `application.yml`
```
server:
  port: 8080
spring:
  profiles:
    active: prod
```
- `application-prod.yml`
```
logging:
  config: classpath:logback-spring.xml
```

## 3. 简单使用
```java
private static final Logger LOGGER = LoggerFactory.getLogger(TestController.class);
//日志级别设置为info,可以输出info以及日志级别低于info的日志信息
LOGGER.info("测试info级别的日志");
//可以使用占位符{}连接字符串和变量值
LOGGER.info("text的内容:{}",text);
```
