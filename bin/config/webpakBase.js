// 
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { topHtml, bottomHtml } = require("./htmlPlu")
/**
 * @param {enrtyPath,outpotPath,templatePath}opntion 打包的路径  打出包的路径 html模板的路径
 */
module.exports = function (opntion) {
    let { enrtyPath, outputPath, templatePath, modeType } = opntion;
    console.log('module:', modeType)
    let baseConfig = {
        entry: enrtyPath,
        output: {
            filename: 'index.js',
            path: outputPath,
        },
        mode: modeType, //设置当前的环境 是测试还是生产
        module: {
            rules: [{
                test: /\.js$/i,
                exclude: /node_modules/, // 排除文件
                use: [{
                    loader: 'babel-loader',
                    options: {
                        "presets": [
                            //将ES6转化为ES5
                            "@babel/preset-env",
                        ],
                        "plugins": [
                            "@babel/plugin-transform-runtime", //将重复的方法与类 提取出来。调取这个提取出来方法。从而达到webpac包裹的减少
                            ["@babel/plugin-proposal-decorators", {
                                "legacy": true
                            }], //类装饰器
                            ["@babel/plugin-proposal-class-properties", {
                                "loose": true
                            }] //赋值结构的转换
                        ]
                    }
                }],

            }, {
                test: /\.css$/i,
                exclude: /node_modules/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }, {
                test: /\.scss$/i,
                exclude: /node_modules/, // 排除文件
                use: [
                    MiniCssExtractPlugin.loader,//使用插件开始进行设置分离
                    // 'style-loader',将style-loader使用MiniCssExtractPlugin.loader替换 他们不能同时存在
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                require('autoprefixer')({
                                    overrideBrowserslist: ['last 2 version', '>1%']
                                })
                            ]
                        }
                    },
                    "sass-loader"
                ]
            },{
                test:/\.(png|gif|jpg)$/,//定制规则
                use: {
                    loader:'url-loader',
                    options:{
                        limit:10*1024,  //设置小于10Kb的图片转化为base64输出 不在使用image
                        outputPath:'images',//打包后存放的文件夹的位置
                        name:'[name].[ext]'//[name]=名字 [ext]=后缀
                    }
                }
            }]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'index.[hash:8].css',
            }),
            new CleanWebpackPlugin(),
            //设置模板文件
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: templatePath,
                inject:'body',
                topHtml,
                bottomHtml,
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