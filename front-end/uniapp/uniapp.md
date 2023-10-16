---
icon: page
title: 初次使用uniapp
author: liuzh
time: 2021-02-25
tag: 
 - uniapp
---

## 使用 uniapp 的一些问题记录

### 1. 快速上手
[官方文档地址](https://uniapp.dcloud.io/README)文档中对项目创建、项目的目录结构、运行和发布，都有详细介绍。

### 2. 使用插件
在 uniapp 官网的插件市场，可以找到很多有用的插件，使用 HBuildX 导入插件后，把插件目录复制到项目的 components 文件夹，然后就可以使用了，例如，我导入了一个车牌号码输入的插件`uni-plate-input`:
```vue
<template>
    <view class="cu-form-group">
        <view class="title">车牌号</view>
        <input placeholder="请点此输入" disabled="true" @tap="plateShow=true" v-model.trim="plateNo" />
        <plate-input v-if="plateShow" :plate="plateNo" @export="setPlate" @close="plateShow=false" />
    </view>
</template>

<script>
    import plateInput from '@/components/uni-plate-input/uni-plate-input.vue'
    export default {
        components: {
            plateInput
        },
        data() {
            return {
                plateNo:'',
                plateShow:false
            }
        },
        methods: {
            setPlate(plate){
                if(plate.length >= 7) this.plateNo = plate
                this.plateShow = false
            }
        }
    }
</script>
```

### 3. 发送请求给后台接口
使用 `uni.request(OBJECT)`
```javascript
            //发起请求（Callback）
            _request() {
				uni.request({
					url: requestUrl,
					dataType: 'text',
					data: {
						noncestr: Date.now()
					},
					success: (res) => {
						console.log('request success', res)
						uni.showToast({
							title: '请求成功',
							icon: 'success',
							mask: true,
							duration: duration
						});
						this.res = '请求结果 : ' + JSON.stringify(res);
					},
					fail: (err) => {
						console.log('request fail', err);
						uni.showModal({
							content: err.errMsg,
							showCancel: false
						});
					},
					complete: () => {
						this.loading = false;
					}
				});
            },
            //发起请求（Promise）
			_requestPromise() {
				uni.request({
					url: requestUrl,
					dataType: 'text',
					data: {
						noncestr: Date.now()
					}
				}).then(res => {
					console.log('request success', res[1]);
					uni.showToast({
						title: '请求成功',
						icon: 'success',
						mask: true,
						duration: duration
					});
					this.res = '请求结果 : ' + JSON.stringify(res[1]);

					this.loading = false;
				}).catch(err => {
					console.log('request fail', err);
					uni.showModal({
						content: err.errMsg,
						showCancel: false
					});

					this.loading = false;
				});
            },
            //发起请求（Async/Await）
			async _requestAwait() {
				const [err, res] = await uni.request({
					url: requestUrl,
					dataType: 'text',
					data: {
						noncestr: Date.now()
					}
				});
				if (err) {
					console.log('request fail', err);
					uni.showModal({
						content: err.errMsg,
						showCancel: false
					});
				} else {
					console.log('request success', res)
					uni.showToast({
						title: '请求成功',
						icon: 'success',
						mask: true,
						duration: duration
					});
					this.res = '请求结果 : ' + JSON.stringify(res);
				}
				this.loading = false;
			}
```

### 4. 跳转到外部页面
使用`uni.navigateTo(OBJECT)`只能跳转到应用内的某个页面，跳转外部页面要使用`web-view`组件，如果想打开 web url，在App平台可以使用 `plus.runtime.openURL`或`web-view`组件；H5平台使用 `window.open`；小程序平台使用`web-view`组件（url需在小程序的联网白名单中）。在hello uni-app中有个组件ulink.vue已对多端进行封装，可参考。

### 5. js Form 表单提交
由于项目中需要在请求接口后获取到表单参数值然后自动提交表单，使用 uniapp 的 form 无法实现，用 js 操作 dom 来提交：
```javascript
var form = document.createElement('form');
form.action = this.actionUrl;
form.method = 'post';
var input1 = document.createElement('input');
input1.type = 'hidden';
input1.name = 'transName';
input1.value = this.transName;
form.appendChild(input1);
//...
document.body.appendChild(form);
form.submit();
```

### 6. 导航栏不显示返回按钮
```javascript
mounted() {
	//去掉导航栏上的返回按钮
	var a = document.getElementsByClassName('uni-page-head-hd')[0]
	a.style.display = 'none'
},
```

### 7. 调用第三方程序打开指定的URL
```javascript
void plus.runtime.openURL( url, errorCB, identity );
```
#### 参数：
- url: ( String ) 必选 要打开的URL地址
- errorCB: ( OpenErrorCallback ) 可选 打开URL地址失败的回调  
  打开指定URL地址失败时回调，并返回失败信息。
- identity: ( String ) 可选 指定打开URL地址的程序名称  
  在iOS平台此参数被忽略，在Android平台为程序包名，如果指定的包名不存在，则打开URL地址失败。

### 8. vue 项目打包安卓 app 后，刷新页面的方法
**给组件增加一个 key 属性，key 改变时会触发组件的重新渲染**
```
<view class="main" :key="mainKey">
</view>
...
this.mainKey += 1
```