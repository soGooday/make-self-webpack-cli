/**
 * path, 要读取目录的完整路径及目录名；
 * [callback(err, files)], 读完目录回调函数；err错误对象，files数组，存放读取到的目录中的所有文件名
 */ 
const path = require("path");  
const webpackConfig = require('./config/webpakBase');
const getFile = require("./getFile");
const webpack = require('webpack');
const chalk = require("chalk");//改变颜色
//包指令类型
const _packingType = {
    t:'-t',//打包测试服专用
    p:'-p'//打包正式服专用
}
//被打包的项目类型
const objType={
    G:'G',
    GFileName:`${path.resolve(__dirname,'../')}/interactiveActivities`,//G类型的项目路径
}
//打包要使用的相关参数
const buildConfig={
    testDistPath:`${path.resolve(__dirname,'../')}\\dist.test`,//测试环境打包的路径
    proDistPath:`${path.resolve(__dirname,'../')}\\dist.pro`,//生产环境的打包路径

}

module.exports = { 
    /**
     * 传入需要的相关参数
     * @param  {option} 参数 objName要打包的项目名称,packingType打包的项目类型
     * 
     */
    initData(option){
        //取到指令
        let {objName,packingType} = option;
        //打印指令参数
        console.log(`要打包的项目名称:${objName}    packingType:${packingType}`); 
        //检测指令是否正常  是成产环境还是测试环境 取到要打包的环境
        let modeType = this.showPackingType(packingType);
        option={...option,modeType};
        this.getTargetParh(option,_webpackConfig=>{
                //使用上述webPack的配置执行webpack打包工具
                this.buildPack(_webpackConfig);  
        }); 
    },
    /**
     * 得到当前的
     * @param {object} options 
     * @param {function} BACK 
     */
    getTargetParh(options,BACK){
        //取到指令
        let {objName,packingType,modeType} = options; 
        //得到相应根目录文件路径 主要是 .js .html 在打包的时候是需要使用到的
        let objBaseRootPath = this.getModularRootPath(objName);
        //得到目标文件的路径
            getFile.raedFile(objBaseRootPath,objName).then((targetObjPathList)=>{ 
                //将路径传递给wepack打包的设置
                let config = this.getWebpackBuildConfig({...options,...targetObjPathList});
                if(BACK!=null){
                    BACK(config);
                }  
            },()=>{
                throw new err('项目目标路径读取失败'); 
            });    
    },
    /**
     * 用户打包的类型 -t测试服  -p正式服  为了检测最后一个字符的对错
     * @param {string} packingTypeype 
     */
    showPackingType(packingTypeype){
        let type = null;
        if(packingTypeype === _packingType.t){
            type = 'development';  //开发环境 
        }else if(packingTypeype === _packingType.p){
            type = 'production';  //生产环境
        }else{
            let typeList = [];
            for(let key in _packingType){ 
                // console.log('packingTypeype[key]:',packingTypeype(key))
                typeList.push(_packingType[key]);
            }
            console.log(`没有指令参数${packingTypeype},当前只存在`,typeList);
            throw new Error('err');
        }
        return type;
    },
    /**
     * 传入项目的名称  返回项目类型 目前只有G类型
     * @param {string} objName 
     */
    getModularRootPath(objName){
        console.log('打包的类型是:',objName[0]);
        let targetFile = null;
        if(objName[0] === objType.G){
            targetFile = objType.GFileName;
        }
        return targetFile;  //这个装的是game的相关互动 
    }, 
    /**
     * 制作打包需要的相关参数
     * @param {object} opention  options
     * reture 将配置返回
     */
    getWebpackBuildConfig(opention){  
        let {htmlPath,jsPah,modeType} = opention;//取到入口文件js与模板文件html
        let outputPath = modeType ==='production' ?  buildConfig.proDistPath : buildConfig.testDistPath;//输出的文件的路径
        let config = {
            enrtyPath:jsPah,
            outputPath,
            templatePath:htmlPath,
            modeType
        }  
        //得到最后的webPack的配置
        let _webpackConfig = webpackConfig(config); 
        return _webpackConfig;
        // //使用上述webPack的配置执行webpack打包工具
        // this.buildPack(_webpackConfig);  
    },
    /**
     * 将指定文件使用webpack打包
     * @param {object} webpackConfig 
     */
    buildPack(webpackConfig){  
        //开始执行
        webpack(webpackConfig, function (err, stats) {
            //打印相关参数
            process.stdout.write(stats.toString() + '\n');
             // 如果打印失败，则抛出错误
            if (err) throw err
            // 如果打包过程中有些错误，则打印错误信息
            if (stats.hasErrors()) {
                console.log(chalk.red('Build failed with errors.\n'))
                // 退出node程序
                process.exit(1)
            }
        }); 
    },
    /**
     * //传入相关的参数数据
     * @param {objcet} option 
     * return  返回配置的相关信息webpack配置的信息
     */
    getWebapckConfig(option,BACK=null){
        let {objName} = option;
        let modeType = 'development';
        option={...option,modeType};
        this.getTargetParh(option,_webpackConfig=>{
                //使用上述webPack的配置执行webpack打包工具
                if(BACK!=null){
                    BACK(_webpackConfig);
                } 
        }); 
    }
   
  

}; 





 