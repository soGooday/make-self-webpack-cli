# 介绍

## 初始化工程

### 第一步初始化环境
执行命令：`npm install` 或者：`yarn`
### 第二步
执行命令：`npm link`


## 具体指令的执行

### 本地开发环境
执行命令：`bxmil dev 项目名称`
### 打包测试环境
执行命令：`bxmil build 项目名称 -t`
### 打包正式环境
执行命令：`bxmil build 项目名称 -p`

## 扩展打包文件类型

> bin/build.js/ 区中 objType 数组
```javascript
 const objType = [{
        TYPE: 'G',
        FileName: `${path.resolve(__dirname, '../')}/GameV`,//G类型的项目路径
    },{
        TYPE: 'L',
        FileName: `${path.resolve(__dirname, '../')}/src/L`,//L类型的项目路径
    }
]
```