//取到webpack的相关配置
const build = require('./build');
//服务器的启动
const express = require('express');
 // 使用webpack开发中间件来 从而启动本地的服务器
const middleware = require('webpack-dev-middleware');
//引入webpack
const webpack = require('webpack');
//打开浏览器
const opn = require('opn');
//改变颜色
const chalk = require("chalk"); 

//开启本地服务器一些参数
const severConfig = {
    devPort:9005,
    devIP:'localhost'
}

module.exports = {
    /**
     * 传入相关的参数 启动服务器
     * @param {object} options 
     */
    initData(options){
        let {objName} = options; 
        build.getWebapckConfig(options,res=>{
            console.log('res-----:',res);
            this.openLocalServer(res);
        })  
    }, 
    /**
     * 开启本地的服务器
     * @param {object} options  wwebpack的设置
     */
    openLocalServer(options){ 
        // 创建express实例
        const app = express();
        //得到webpack编译过的webapckConfig
        let compiler = webpack(options);        
        app.use(middleware(compiler));
         // 启动服务
        app.listen(severConfig.devPort, () => console.log(`项目已启动，端口号为：${severConfig.devPort}!`));
        opn(`http://${severConfig.devIP}:${severConfig.devPort}/index.html`)
        console.log('当前的地址是:',  chalk.green(`http://${severConfig.devIP}:${severConfig.devPort}/index.html`));
    } 
}