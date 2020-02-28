#!/usr/bin/env node
//变为字符logo
const figlet = require("figlet");
//改变颜色
const chalk = require("chalk"); 
//引入打包
const build = require("./build");
//启动本地的服务器
const server = require('./serve');

// console.log('getFileInfo:',getFileInfo);
//显示名字
const showName = () => {
	console.log(
	  chalk.green(
		figlet.textSync("bxmiv", {
		//   font: "Ghost",//Isometric1
		  horizontalLayout: "default",
		  verticalLayout: "default"
		})
	  )  
	); 
  }
//自己封装
const init = (argv)=> {
	console.log('argv',argv);
	let [instructions,objName,packingType] = argv; 
	//显示logo
	showName(); 
	if (instructions === '-v' || instructions === '--version') { 
		console.log('version is 0.0.1'); 
	} else if (instructions === '-h' || instructions === '--help') {  
		console.log('正在创建中......'); 
	}else if (instructions === 'build' || instructions === '--build') {  
		// packingType=(-t|-p)
		// objName项目的名称  
		build.initData({objName,packingType}); 
	} else if (instructions === 'server' || instructions === '--server') {  
		//将需要启动的服务器的文件名称写出来
		// console.log('使用了服务器了:');
		server.initData({objName});
	} 

} 
init(process.argv.slice(2));
/****
 * 指令输入的格式
 * ***************************
 * 打包指令格式
 * bxmiv build G001-1 -t
 * bxmiv 开头指令
 * build 当前是打包工程
 * G001-1当前需要打包的工程
 * -t 打成测试包 -p打成正式服的包
 * ***************************
 * 开启本地测试服务器
 * bxmiv server G001-1
 * bxmiv 开头指令
 * server 开始本地服务器
 * G001-1 打开工程G001-1
 * 
 * 
 * 
 */
