# nuxt-blog

## 前言
   一直想做一个包含前后端的博客，之前也有过Hexo的博客，特点就是使用方便，零基础搭建博客。写文章就是写Markdown。平时也有接触很多博客，也看过一些开源的博客源码，总是莫名的佩服。 于是乎参考了几个开源项目的技术架构，前端Vue + Nuxt 技术栈。后端采用Koa2 + mongodb + mongoose 技术栈。 

## 介绍
- 前后台技术分离开发
- 博客样式 交互比较乱，借鉴过很多博主的设计。(设计太low，请原谅)

- [博客地址](http://119.27.163.168/) - 联系我可以 email zhongqiang1839@163.com | QQ 289860723 | 博客关于页面留言~
- [前端项目地址](https://gitee.com/zhongqiang1839/nuxt-blog)
- [后端项目地址](https://gitee.com/zhongqiang1839/api-server)
- [预览地址](http://119.27.163.168/)

### 技术栈

- 前端 Nuxt(整套技术Nuxt的架构 包括router axios vuex 等等)
  - less 预编译
  - 插件
  - gravatar(评论头像服务)
  - marked highlight.js markdown的高亮方案
  - v-viewer 图片预览功能
  - mavon-editor markdown编辑器很帅
  - vue-count-to vue-awesome-swiper vue-amap(计数器，轮播图，高德地图)
  
- 后端 
  - koa2 + koa-router
  - koa-bodyparser
  - koa-multer(文件上传)
  - koa-static
  - koa2-cors(cors跨域方案)
  - mongoose mongoose-paginate  
  
- 运维
  - pm2 (守护进程，负载均衡)
  - pm2 (自动化部署)
  - nginx 代理
    
  
### 实现功能

- [x] 主页 + 列表页
- [x] 分类页 + 标签页
- [x] 响应式开发，移动端适配
- [x] markdown自定义高亮显示
- [x] 主题切换 
- [x] markdown编写
- [x] 评论回复功能

### 待实现功能

- [x] 搞定域名 域名 域名
- [x] 图片cdn
- [x] 归档
- [x] 友链
- [x] 重新设计关于页面

### 截图

#### 桌面端
![移动端截图](http://119.27.163.168:1839/uploads/1555319245650.gif)
#### 移动端
![pc端截图](http://119.27.163.168:1839/uploads/1555064469202.gif)
#### 编写文章
![写文章](http://119.27.163.168:1839/uploads/1555318770365.gif)

PS : 觉得不错的伙伴可以给个 star ~~~ 或者 fork 下来看看哦。如果有什么建议，也可以提 issue 哦

