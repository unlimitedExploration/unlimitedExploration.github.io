---
title: grails 文件上传和下载
author: liuzh
time: 2020-03-09
tag: 
 - grails
---

## grails 异步上传文件
1. fileinput [官网](https://plugins.krajee.com/file-input)
2. 从官网下载 fileinput 的压缩包，解压后找到 js 目录和 css 目录，把 js 和 css 文件复制到项目相应的目录下，还需要把 img 目录也复制到项目中，如果想要使用不同风格的预览主题，要把 themes 目录下的主题文件也复制到项目
3. 在页面上引入需要的文件后，在表单中使用：  
`<input type="file" id="myfile" name="myfiles" multiple/>`
4. 然后在 js 代码里面设置控件的参数，样式等等，我的配置：  
```javascript
$(document).on('ready', function () {
            $("#myfile").fileinput({
                theme: 'explorer',
                language: 'zh',
                uploadUrl: "/anyurl",
                maxFileCount: 3,
                showUpload: false,
                showRemove: false,
                browseClass: 'btn btn-info btn-sm',
                removeClass: 'btn btn-danger btn-sm',
                fileActionSettings: {showUpload: false, showZoom: false, removeClass: 'btn btn-danger btn-xs'},
                allowedFileTypes:['image','office','pdf'],
                previewFileIcon: '<i class="fas fa-file"></i>',
                allowedPreviewTypes:null,
                previewFileIconSettings: {
                    'doc': '<i class="fa fa-file-word-o text-primary"></i>',
                    'xls': '<i class="fa fa-file-excel-o text-success"></i>',
                    'ppt': '<i class="fa fa-file-powerpoint-o text-danger"></i>',
                    'pdf': '<i class="fa fa-file-pdf-o text-danger"></i>',
                    'jpg': '<i class="fa fa-file-image-o"></i>',
                    'png': '<i class="fa fa-file-image-o"></i>'
                },
                previewFileExtSettings:{
                    'doc': function(ext) {
                        return ext.match(/(doc|docx)$/i);
                    },
                    'xls': function(ext) {
                        return ext.match(/(xls|xlsx)$/i);
                    },
                    'ppt': function(ext) {
                        return ext.match(/(ppt|pptx)$/i);
                    }
                }
            })
        })
```
5. 由于要上传多个文件，使用 jquery 的 ajax 异步上传，先在 js 代码中把文件对象放到 FormData 中： 
```javascript
var formdata = new FormData();
var f = $('#myfile')[0].files;
//fileinput 的 getFileStack 方法可以获取选中的文件对象
var filestack = $('#myfile').fileinput('getFileStack'), fstack = [];
$.each(filestack,function (fileId, fileObj) {
    if (fileObj !== undefined) {
        fstack.push(fileObj);
    }
})
for (var i = 0; i < fstack.length; i++) {
     formdata.append("myfiles" + i, f[i])
}
if (fstack.length > 0) {
     $.ajax({
          url: "后台处理文件上传的 url",
          type: 'post',
          data: formdata,
          cache: false,
          processData: false,
          contentType: false,
          success: function (result) {

          }
     })
}
```
6. grails 后台的 controller : 
```groovy
//保存上传的文件对象
def uploadfiles = []
params.each{key,value ->
    if(key.contains("myfiles")){
        uploadfiles.add(value)
        }
    }
//保存文件到服务器
def uploadPath = servletContext.getRealPath("/")+"project_files"
File uploadDir = new File(uploadPath)
if(!uploadDir.exists()){
    //如果上传目录不存在，创建目录
    uploadDir.mkdir()
}
uploadfiles.each {file ->
     def filename = file.getOriginalFilename();
     if (!file.empty){
          File f = new File(uploadPath + File.separator + filename);
          //println "filesize:"+f.length()
          file.transferTo(f)
     }
}
//给前端返回一个 json 对象 ...
```
7. 下载文件: 
```groovy
//文件路径
String filedir = servletContext.getRealPath("/project_files/");
String fullFilename = filedir + File.separator + filename;
//设置文件类型
response.setContentType(servletContext.getMimeType(filename))
response.setHeader("Content-Disposition","attachment;filename="
.concat(String.valueOf(URLEncoder.encode(filename,"UTF-8"))))
InputStream is = new FileInputStream(fullFilename)
OutputStream os = response.getOutputStream()
//设置缓冲区 is.read(b)当文件读完时返回-1
int len = -1;
byte[] b = new byte[1024];
while ((len = is.read(b)) != -1) {
    os.write(b, 0, len);
}
is.close()
os.close()
```