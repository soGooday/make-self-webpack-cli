// 
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin') 
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');
/**
 * @param {enrtyPath,outpotPath,templatePath}opntion 打包的路径  打出包的路径 html模板的路径
 */
module.exports = function(opntion) {
   let {enrtyPath,outputPath,templatePath,modeType} = opntion; 
   console.log('module:',modeType)
   let baseConfig = {
            entry:enrtyPath,  
            output:{
                filename:'index.js',
                path:outputPath,
            },
            mode:modeType, //设置当前的环境 是测试还是生产
            module:{
                rules:[{
                    test:/\.css$/,
                    exclude:/node_modules/,
                    use:[MiniCssExtractPlugin.loader,'css-loader']
                    // use:['style-loader','css-loader']
                }]
            },
            plugins:[
                new MiniCssExtractPlugin({
                    filename: 'index.[hash:8].css',
                }),
                new CleanWebpackPlugin(), 
                //设置模板文件
                new HtmlWebpackPlugin({
                    filename:'index.html',
                    template:templatePath
                }), 
                //设置全局变量
                new webpack.DefinePlugin({
                    'process.env.NODE_ENV': `'${modeType}'`,
                    'process.env.assetPath': `'${enrtyPath}'`, 
                }), 
                
            ]
   } 
   return baseConfig;
}