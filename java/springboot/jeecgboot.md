---
title: jeecgboot 入门
author: liuzh
time: 2020-03-09
tag: 
 - jeecg
---

## 配置文件

1. 前台全局配置文件，文件位置：public/index.html  
```javascript
<!-- 全局配置 -->
  <script>
    window._CONFIG = {};
    //后台服务域名
    window._CONFIG['domianURL'] = 'http://127.0.0.1:8080/jeecg-boot';
    //CAS服务器地址
    window._CONFIG['casPrefixUrl'] = 'http://cas.example.org:8443/cas';
    //图片服务器域名
    window._CONFIG['imgDomainURL'] = window._CONFIG['domianURL'] + '/sys/common/view';
    window._CONFIG['downloadUrl'] = window._CONFIG['domianURL'] + '/sys/common/download';
    //pdf文件预览地址
    window._CONFIG['pdfDomainURL'] =  window._CONFIG['domianURL'] + '/sys/common/pdf/pdfPreviewIframe';
  </script>
```  

2. 我目前用到的配置  
- 登录页面代码的位置
```
src/components/layouts/UserLayout.vue
src/views/user/Login.vue
```
- 修改首页 logo  
```
src/components/tools/Logo.vue
```
- 修改首页的顶部显示
```
src\components\page\GlobalHeader.vue
```

## online 表单开发
> [官方开发文档](http://doc.jeecg.com/1273752)
1. 下拉列表可以使用数据字典填充数据
2. 表单字段校验：可以使用自定义的正则表达式

## 后台开发

1. 数据库持久层使用了 [MyBatis-Plus](https://mp.baomidou.com/ "MyBatis-Plus")
```java
//QueryWrapper用于生成sql的where条件
QueryWrapper<ApiConfig> apiConfigWrapper = new QueryWrapper<>();
apiConfigWrapper.eq("merchant_id", merchantId);
ApiConfig apiConfig = apiConfigService.getOne(apiConfigWrapper);
```

2. 把生成的代码修改为**模糊查询**：找到 **org.jeecg.common.system.query.QueryGenerator** 中的 **installMplus** 方法，修改如下代码
```java
//根据参数值带什么关键字符串判断走什么类型的查询
QueryRuleEnum rule = convert2Rule(value);
value = replaceValue(rule,value);
// add -begin 添加判断为字符串时设为全模糊查询
if( (rule==null || QueryRuleEnum.EQ.equals(rule)) && "class java.lang.String".equals(type)) {
	 //可以设置左右模糊或全模糊，因人而异
	rule = QueryRuleEnum.LIKE;
}
// add -end 添加判断为字符串时设为全模糊查询
addEasyQuery(queryWrapper, name, rule, value);
```  

3. 后台报错 Required String parameter 'id' is not present，查自 [csdn](https://blog.csdn.net/qq_15238647/article/details/81539287)
> 关于 ajax 请求 spring 后台出现 Required String parameter ‘id’ is not present 异常
>> 如果前端传入的是 json 数据，那么后端使用`@RequestBody HashMap<String, String> map`进行接收，然后再通过`map.get("id")`获取对应的数据；  
>> 如果前端传入的是正常表单数据，那么后端使用`@RequestParam("id") String id`或者`@RequestParam(value="id", required = false) String id`接收参数；  
>> 需要注意的是，如果请求类型为 delete 并且参数类型不是 json 的话，不能使用通过表单类型提交，参数需要跟到请求url后面，并且后台使用`@PathVariable`获取参数 

4. 从配置文件中取参数值
```java
@Autowired
private Environment env;
env.getProperty(xxx.xxx);//传入属性名
```

5. MyBatis-Plus 忽略某个实体类属性和数据库表字段的映射关系
```java
@TableField(exist = false)
private String fieldName;
//spring data jpa 或 hibernate
@Transient
private String fieldName;
```