---
title: docker-compose 部署项目
author: liuzh
time: 2020-03-08
tag: 
 - Docker
---

## 使用 docker-compose 部署 vue 和 spring boot 项目

### 前端

1. 在服务器创建目录 fesbm ，在 fesbm 中创建目录 antd-vue 用于保存前端项目，将前端项目打包后得到的 dist 整个目录上传到 antd-vue
2. 在 antd-vue 目录下创建文件：Dockerfile，文件内容：
```
FROM nginx
COPY dist/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
```
3. 在 antd-vue 目录下创建文件：nginx.conf,文件内容：
```
server {
    listen 80;
    server_name jeecg;
    location ^~ /jeecg-boot {
        proxy_pass http://jeecg:8081/jeecg-boot;
        proxy_set_header Host jeecg;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
    
    location / {
        try_files $uri $uri/ @router;
        root /usr/share/nginx/html;
        index index.html index.htm;
    }

    location @router {
        rewrite ^.*$ /index.html last;
    }
}
```

### 后端

1. 在 fesbm 目录下创建目录 jeecg-boot，用于保存后端项目，将后端项目打包后的 jar 包上传到 jeecg-boot 目录
2. 在 jeecg-boot 目录下创建文件：Dockerfile ，文件内容：
```
FROM java:8
VOLUME /jeecg-boot
ADD jeecg-boot-module-system-2.1.3.jar jeecg.jar
EXPOSE 8081
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/jeecg.jar"]
```  

### docker-compose

1. 在 fesbm 目录下创建文件：docker-compose.yml ，文件内容：
```
version: '3'
services: 
  antdvue:
    build: ./antd-vue
    restart: always
    ports: 
      -3000:80
    depends_on: 
      -jeecg
  jeecg:
    build: ./jeecg-boot
    restart: always
    container_name: "jeecg"
    hostname: "jeecg"
    ports:
      -8081:8081
    depends_on: 
      -redis
  redis: 
    image: redis
    restart: always
    container_name: "redis_jeecg"
    hostname: "redis"
    ports: 
      -6378:6378
    volumes: 
      -./redis.conf:/path/to/redis.conf
    command: redis-server /path/to/redis.conf
```
2. 服务器上已经安装过 redis ，默认的6379端口被占用，所以要自定义一个配置文件指定其它端口，在 fesbm 目录下创建文件：redis.conf ，文件内容：
```
#bind 127.0.0.1 172.25.0.2
appendonly yes
port 6378
```  

### 启动服务

1. docker-compose up --build