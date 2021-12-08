# LiuSha-CLI 脚手架 

### 脚手架功能
1. 语言切换
2. 安装依赖
3. 模版选择（远程或离线）

### 主要功能实现说明
#### 脚本交互
1. inquirer 库
2. inquirer 配置提取到 config/inquirer.config.js , 方便语言切换和管理

#### 模版选择设计
1. 设计：模板模式
2. 模版：目前支持远程(git/gitee) 和离线(local) template 两种方式
3. 接口：
- 【远程(git/gitee)】远程模版利用github/gitee 公共库.可进行其他库的扩展
- 【离线(local)】离线模版利用 fs 库进行文件操作

#### 国际化
1. 设计：单例模式
2. 原理：利用CommonJS 动态加载模块，并对模块进行缓存
3. 配置：国际化语言配置 langs/index.js
4. 使用：(1)必需先注册再使用.默认使用中文（zh_cn.json)
        (2)语言库通过注册具体语言，进行动态加载.
        (3)若已注册,不论后续注册多少次,都用首次注册的信息.

#### await 异步请求异常拦截
1. 通过 utils/try-catch-await.js 统一拦截
2. 对长时间等待的 操作 ，支持 loading 设置

#### 插件机制
1. 针对需定制的公共模版,通过插件机制处理.方便管理和扩展

### 继续完善
1. 国际化切换
2. 脚手架命令 help 信息自定义
3. 异常监控
4. 添加 config，build，设置，等指令
5. 模版列表从获取仓库 调整为 获取仓库分支，每个分支代表不同的模版
6. 完善模版库

### 指令
#### 启动指令
liusha-cli 或 ls-cli 或 ls-vue

#### 其他指令
通过 liusha-cli --help 查看

### 脚手架搭建说明

#### 搭建前提
1. 脚手架
2. 模版库

#### 搭建流程
1. 搭建环境
2. 创建脚手架启动命令
3. 提供命令行交互，配置模版基础信息
4. 通过配置，下载远程模版
5. 发布

#### 脚手架工具库
1. commander 命令行自定义指令
2. inquirer 命令行交互库
3. chalk 控制台输出内容样式处理
4. download-git-repo 下载远程模版
5. cross-spawn 支持跨平台调用系统命令
6. ora 控制台 loading 样式
7. fs-extra 系统fs模块的扩展，支持Promise
8. table 控制台输出表格
9. figlet 控制台打印logon

#### 本地调试及发布
- 调试
1. 开发和调试并行时，可通过 npm link 直接在当前环境上验证
2. package.json 文件中必需配置 bin 属性,用于设置启动指令

- 发布
1. 登陆：注册npm账户, 并登陆. npm login
2. 发布：npm publish

#### 参考资料
- 脚手架搭建说明： https://juejin.cn/post/6966119324478079007

### 发包更新说明
1. fix：git 库无法访问问题，git库创建成功。
2. fix：ls-cli 脚手架相关目录无法完全现在问题
3. fix：ls-cli 库依赖包无法自动安装问题
4. add：vue2 模版目录已创建完成，vue3 模版目录目前为示例，需完善。
5. 说明：目前此脚本架只能作为 samples 借鉴，或是简单的项目创建，无法应用到实际项目中。

### 其他
- 国内仓库：https://gitee.com/YCodeProjects/ls-cli.git
  说明：由于访问github异常问题，最新代码无法实时推送。故优先使用国内仓库
- 联系方式：
