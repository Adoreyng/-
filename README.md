## 前端开发规范
#### 1. 前端开发框架
##### 1.1 后台

​	1. vue+Element-ui

##### 1.2 PC端

1. vue+Element-ui

##### 1.3 移动端 / APP端

1. vue+Vant-ui
2. vue+Mint-ui

##### 1.4 小程序

	1. uni-app

```
注：搭建框架统一使用 yarn：

初始化            yarn init    
安装依赖          yarn install 或者 yarn 
新增依赖          yarn add element-ui   
删除依赖          yarn remove element-ui     
更新依赖          yarn upgrade    
全局安装或删除     yarn global remove vue-cli   
同时下载多个       yarn add axios vue-axios   

打包：
yarn run build--dev  // 开发环境
yarn run build--sit  // 内部测试环境
yarn run build--uat  // 用户测试环境
yarn run build--prod / yarn run build  // 生产环境

具体优势，请参考：https://www.jianshu.com/p/254794d5e741
```



#### 2. 前端代码相关规范(持续更新)

##### 2.1 通用规范
1. 全局开启 ESlint，特殊除外
##### 2.2 命名规范
1. 命名只能包含字母、中划线、下划线，避免使用数字，如：card1

2. 模块命名：驼峰规则，全部小写，以“-”分隔，如：order

3. 文件目录命名：驼峰规则，全部小写，以“-”分隔，如：my-card

4. 文件命名：驼峰规则，全部小写，以“-”分隔，如：my-card.vue

5. 路由命名：驼峰规则，全部小写，以“-”分隔，如：my-card

6. js变量命名：驼峰规则，以大写分隔，如：orderAmoount,以let定义变量

7. js常量命名：驼峰规则，全部大写，以“_”分隔，如：ORDER_STATUS，以const定义常量

8. css命名：驼峰规则，全部小写，以“-”分隔，如：my-card

9. 代码结尾统一不加分号

10. 严禁使用魔法数字、字符串，统一定义常量

11. 严禁页面中直接使用外部链接，需要配置在环境配置文件

12. css必须增加“scoped”属性，避免全局污染,  更改组件内部样式可以不使用“scoped”属性，但是必须要使用css命名包含，如：

    ```
    
    <style lang="scss">
      .productSelect {  // 当前页面的css名字
        .searchBox { // 子组件的class名字
          display: flex;
          align-items: center;
        }
      }
    </style>
    ```

    

13. 清除无用的变量、常量、引用、图片等
##### 2.3 注释规范
1. 模板注释
`<!-- 代码 -->`
2. 方法注释
```
无参型，需进行功能说明。格式采用  "//"
// 重置
reset(){
    this.params = {}
    this.page = 1
    this.per_page = 10
    this.search()
  },
```
```
有参型，需进行功能、参数、返回值说明。格式统一“/*”
/**
 *@desc  改变状态
 *@param  id      [String]  改变对象的id
 *@param  status  [String]  改变对象的status
 *@return config  [Object]  配置对象
 */
changeStatus(id, status) {
  let self = this
    return config = {
    url: api.changeBannerStatus,
    loading: "loading",
    param: {
      banner_position_id: id,
      status: status
    }
  };
```
3. 代码块注释
```
单行属性，注释写在行尾
activeName: 'actList',// 活动名称
```
```
多行属性，注释写在行上
// 表格配置
tableConfig: [
          {
            name: "SKU",
            val: "product_model"
          }, {
            name: "活动已售",
            val: "sold"
          }, {
            name: "待拼成订单",
            val: "pending"
          },
        ]
```
4. css注释
使用“/**/”
```
/*.login-form {
    position: relative;
    width: 450px;
    max-width: 100%;
    padding: 30px 35px;
    margin: 120px auto;
    overflow: hidden;
    border-radius: 8px;
    background-color: #fff
  }*/
  
```

​	5. less-css / scss-css注释

​		使用“// ”

```
// .login-form {
//     position: relative;
//     width: 450px;
//     max-width: 100%;
//     background-color: #fff
//   }
  
```



#### 3. 通用配置

##### 3.1 多环境配置
1. dev：开发环境
2. sit:  内部测试环境
3. uat: 用户测试环境
4. prod: 生产环境
##### 3.2 统一接口封装
1. 接口请求封装：GET、POST、POST（文件上传）、文件下载
2. 统一异常处理
3. 统一权限拦截

### 4.项目结构

```
├── build             	 	  // 项目构建(webpack)相关代码         
    ├── build.js     		  // 生产环境构建代码
    ├── check-versions.js 	  // 检查node&npm等版本
    ├── dev-client.js     	  // 热加载相关
    ├── dev-server.js     	  // 构建本地服务器
    ├── utils.js          	  // 构建配置公用工具
    ├── vue-loader.conf.js 	  // vue加载器
    ├── webpack.base.conf.js  // webpack基础环境配置
    ├── webpack.dev.conf.js   // webpack开发环境配置
    ├── webpack.prod.conf.js  // webpack生产环境配置
├── config					  // 项目开发环境配置相关代码                     
    ├── dev.env.js  		  // 开发环境变量                
    ├── sit.env.js  		  // 内部测试环境                   
    ├── uat.env.js  		  // 用户测试环境
    ├── index.js			  // 项目一些配置变量
    ├── prod.env.js 		  // 生产环境变量
├── node_modules			  // 项目依赖的模块      
├── src						  // 源码目录
    ├── assets				  // 资源目录
    ├── components			  // vue公共组件
		├── Hello.vue
    ├── store				  // 公共仓库
  		├── index.js
  		├── state.js 		  // 存放数据
  		├── mutations.js	  // 改变数据
    ├── views 				  // 项目页面
  		├── index.vue
    ├── utils 				  // 公共js文件
  		├── index.js
    ├── router				  // 前端路由
  		├── index.js		  // 路由配置文
    ├── App.vue				  // 页面入口文件（根组件）
    ├── main.js				  // 程序入口文件（入口js文件）
├── static					  // 静态文件，比如一些图片，json数据等
├── .babelrc			      // ES6语法编译配置
├── .editorconfig			  // 定义代码格式
├── .gitignore				  // git上传需要忽略的文件格式
├── index.html				  // 入口页面
├── package.json 			  // 项目基本信息
├── README.md				  // 项目说明
```

