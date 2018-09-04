# react-base
###### 该项目主要可以作为其他新项目的基础项目使用

#### master分支架构: react为主框架，redux作为全局数据流管理，再结合saga实现界面跟业务逻辑的分离。

#### 使用master作为基础项目：

1 Clone本项目

2 移除 git相关信息，拷贝到新的git目录（也可以使用git命令进行处理，git remote set-url origin [url]）   

3 运行 docker-compose up （也可以直接运行npm start）  

4 首页地址为：localhost:3500/home，有简单的登录和语言切换代码例子.   

5 Template页面路径为：/app/containers/Template，可以作为新建页面的基础代码（新建页面需要修改route内容）

6 Template页面访问地址为：localhost:3500/template，有直接修改reducer或者通过saga处理后更新reducer的代码例子.


#### master发布，目前docker环境使用的是node:9.6.1 + nginx:1.13.9-alpine

```
docker build -f Dockerfile-prod -t be-base-prod .
docker run -it -p 8080:80 --rm be-base-prod
```
8080位本地端口