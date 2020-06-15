/**
 * path, 要读取目录的完整路径及目录名；
 * [callback(err, files)], 读完目录回调函数；err错误对象，files数组，存放读取到的目录中的所有文件名
 */
const fs = require("fs");
const path = require("path"); 
const glob = require("glob");
 

module.exports = { 
    /**
     * 通过递归知道到相应文件路径
     * @param {string} dirname 路径
     * @param {string} targeFileName 目标！！文件的名字！！
     */
    raedFile(dirname,targeFileName){ 
        let resPath =  this.finObjPath(dirname,targeFileName);
        resPath = resPath[0] 
        //文件路径的集合
        let specificPath = null;
        //通过指定的路径 读取下面的文件
        return new Promise((resolve,inject)=>{
            fs.readdir(resPath , (err, files) => {
                if (err){
                    inject(specificPath);
                    throw err; 
                }else{
                    // console.log('--files--',files);
                    //将读取出来文件遍历
                    //具体的文路径返回出去交给打包文件处理
                    specificPath = files.map((itme)=>{ 
                        // console.log('--files--',path.normalize(resPath + '/' + itme));
                        return path.normalize(resPath + '/' + itme)
                    }); 
                    let htmlPath = specificPath.filter(itme=>{return /.html$/.test(itme)});
                    let jsPah = specificPath.filter(itme=>{return /.js$/.test(itme)});
                    let opention = {
                        htmlPath:htmlPath[0],
                        jsPah:jsPah[0]
                    }
                    //将html与js导出
                    resolve(opention); 
                } 
            })
        }) 
        
    },
    /**
     * 通过递归知道到相应文件路径
     * @param {string} dirname 路径
     * @param {string} targeFileName 目标！！文件的名字！！
     * @return 返回的文件的一个路径
     */
    finObjPath(dirname,targeFileName){
        // console.time('glob');
        let res = glob.sync(dirname+'/**/*');
        // console.timeEnd('glob');
        // console.time('glob1');
        // console.log('res:',res);
        let resPath = res.filter(itme=>{
            // console.log('itme',itme,/G001-1$/.test(itme));
            return new RegExp(`${targeFileName}$`).test(itme)
        })
        // console.timeEnd('glob1');
        return resPath;
        // let res= null;
        // glob(dirname+'/**/*',function(err,res){
        //     res = res;
        // })
//  
    }
}; 

 


