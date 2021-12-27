# LiuSha-CLI 脚手架 

版本说明：
- 1.0.x 版本安装有问题，已废弃。
- 请使用2.0以上版本

##### 主要更新说明
1. 完善说明文档
2. 优化依赖安装

### 指令
##### 启动指令
liusha-cli 或 ls-cli 或 ls-vue

##### 其他指令
通过 ls-cli --help 查看

##### 具体指令使用
通过 ls-cli 【command】 --help 查看

##### 目前支持的指令
|     指令/别名    |       描述        |                    配置                   |
|-----------------|------------------|------------------------------------------|
|     create      |      创建项目     |  -f(强制覆盖) -src(模版来源) -h(帮助)        |
|-----------------|------------------|------------------------------------------|
|     list        | 列出模块具体信息    | -tpl(模版支持列表) -i(国际化支持) -conf(配置)|
|-----------------|------------------|------------------------------------------|
|     config      |    全局配置管理    |  -v(key=value) -k(key) -h(帮助)           |
|-----------------|------------------|------------------------------------------|
|     待更新       |      待更新       |                     待更新                |
|-----------------|------------------|------------------------------------------|


### 脚手架功能
1. 语言切换
2. 安装依赖
3. 模版选择（远程或离线）
4. 脚手架全局配置
5. 安装模式选择（手动或自动）

### 主要功能实现说明
##### 脚本交互
1. inquirer 库
2. inquirer 配置提取到 config/inquirer.config.js , 方便语言切换和管理

##### 模版选择设计
1. 设计：模板模式
2. 模版：目前支持远程(git/gitee) 和离线(local) template 两种方式
3. 接口：
- 【远程(git/gitee)】远程模版利用github/gitee 公共库.可进行其他库的扩展
- 【离线(local)】离线模版利用 fs 库进行文件操作

##### 全局配置
1. 设计：单例模式
2. 原理：利用 conf 库操作
3. 配置：默认配置和支持操作控制文件。config/globalConfigCli.js
4. 初始化合并策略：初始化时，优先使用用户配置项，再合并默认配置项
5. 使用示例：(支持操作:set|get|has|delete|list|clear)
- 增加配置【set】：ls-cli config set -v key=value
- 查看/删除/存在【get/delete/has】：ls-cli config get|delete|has -k key
- 查看所有配置【list】：ls-cli config list 或 ls-cli ls -conf
- 清空配置【clear】：ls-cli config clear
- 查看配置初始化：ls-cli config get -k is_init 若需要初始化默认配置，只需设置 is_init=false

##### 国际化
【说明】目前仅支持中文(zh_cn)和英文(en_us)，若需支持其他则需自己扩展
1. 设计：单例模式
2. 原理：利用CommonJS 动态加载模块，并对模块进行缓存
3. 配置：国际化语言配置 langs/index.js
4. 使用：(1)必需先注册再使用.默认使用中文（zh_cn.json)
        (2)语言库通过注册具体语言，进行动态加载.
        (3)若已注册,不论后续注册多少次,都用首次注册的信息.
5. 切换：通过 LS-Cli 脚手架config配置项 current_langs 进行切换
- 切换中文：ls-cli config set -v current_langs=zh_cn
- 切换英文：ls-cli config set -v current_langs=en_us
 
##### await 异步请求异常拦截
1. 通过 utils/try-catch-await.js 统一拦截
2. 对长时间等待的 操作 ，支持 loading 设置

##### 插件机制
1. 针对需定制的公共模版,通过插件机制处理.方便管理和扩展

### 继续完善
1. 脚手架命令 help 信息自定义
2. 异常监控
3. 模版列表从获取仓库 调整为 获取仓库分支，每个分支代表不同的模版
4. 完善模版库（利用策略模式，动态注入扩展）
5. 扩展其他指令,如 build等

### 脚手架搭建说明

##### 搭建前提
1. 脚手架
2. 模版库

##### 搭建流程
1. 搭建环境
2. 创建脚手架启动命令
3. 提供命令行交互，配置模版基础信息
4. 通过配置，下载远程模版或通过fs库操作离线模版
5. 发布

##### 脚手架工具库
1. commander 命令行自定义指令
2. inquirer 命令行交互库
3. chalk 控制台输出内容样式处理
4. download-git-repo 下载远程模版
5. cross-spawn 支持跨平台调用系统命令
6. ora 控制台 loading 样式
7. fs-extra 系统fs模块的扩展，支持Promise
8. table 控制台输出表格
9. figlet 控制台打印logon
10. conf 用于保存脚手架默认配置信息
11. axios 服务访问

##### 本地调试及发布
- 调试
1. 开发和调试，可通过 npm link 直接在当前环境上验证
2. package.json 文件中必需配置 bin 属性,用于设置启动指令
3. 移除本机调试验证环境 npm uninstall -g liusha-cli

- 发布
1. 登陆：注册npm账户, 并登陆. npm login
2. 发布：npm publish
3. 撤销发布：npm unpublish 包名@版本号 若需要强制撤销，需加 --force

##### 参考资料
- 脚手架搭建说明： https://juejin.cn/post/6966119324478079007

### 其他
- 国内仓库：https://gitee.com/YCodeProjects/ls-cli.git 
  说明：由于访问github异常问题，最新代码无法实时推送。故优先使用国内仓库
- 联系方式：
- 运行情况：亲测好使😋
- 远程模版说明：利用 ls-cli create 创建项目使用远程模版时，请选择Vue2模版【ls-cli-template】

### 更新记录
【说明】：目前此脚本架只能作为 samples 借鉴，或是简单的项目创建，无法应用到实际项目中。

##### 2.1.2
1. 完善说明文档
2. 优化依赖安装
##### 2.1.1
1. 增加 LS-Cli 脚手架配置config
2. 优化国际化切换。调整为通过config配置 current_langs 进行切换
- 切换中文：ls-cli config set -v current_langs=zh_cn
- 切换英文：ls-cli config set -v current_langs=en_us
3. 完善服务请求超时时间配置。通过config配置 request_timeout 设置超时控制,单位为毫秒
- 请求超时设置（1分钟）：ls-cli config set -v request_timeout=60000

##### 2.0.3
1. 完善项目基本信息入口文件手动配置

##### 2.0.2
1. 支持项目基本信息手动配置。包括：项目名，版本，描述，入口文件，开源许可证等；
2. 优化依赖安装和项目目录是否覆盖业务逻辑

##### 2.0.1
1. fix：ls-cli 脚手架相关目录无法完全下载问题
2. fix：ls-cli 库依赖包无法自动安装问题

##### 2.0.0
1. fix：git 库无法访问问题，git库创建成功。
2. add：vue2 模版目录已创建完成，vue3 模版目录目前为示例，需完善。

##### 1.0.x
1. 此相关版本运行异常，已废弃