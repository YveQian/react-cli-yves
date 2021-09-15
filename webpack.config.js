const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

function resolve(dir) {
    return path.resolve(__dirname, dir)
};
// const entrys = require("./entry.js");
// const htmlArray = [];

// Object.keys(entrys).forEach((element) => {
//   console.log(element, "element");
//   htmlArray.push(
//     new HtmlWebpackPlugin({
//       filename: "./" + element + "/" + "index.html",
//       template: "src/" + element + "/" + "index.html",
//       title: element,
//       inject: "body",
//       chunks: [element, "vendor"],
//     })
//   );
// });
module.exports = {
    mode:"production",
    entry: './src/index.js',
    output:{
        // filename: "./[name]/[name][hash].js",
        // path: path.resolve(__dirname, "dist"),
        path : resolve("./dist"),
        filename: "js/[name].[hash].js",
        publicPath: "/" 
    },
    resolve: {
        extensions: ['.js', '.json'], 
        alias: {
            '@': path.join(__dirname, '', "src")
        }
    },
    // 模块
    module:{
        rules:[
            {
                test: /\.(js|jsx)$/,
                exclude: path.resolve(__dirname, 'node_modules'),
                // include: path.resolve(__dirname, 'src'),
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                use:[
                    {
                        loader: 'style-loader',
                    },
                    { 
                        loader: 'css-loader',
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {
                    loader: 'style-loader', 
                    },
                    {
                    loader: 'css-loader',
                    },
                    {
                    loader: 'less-loader', 
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000, // url-loader 包含file-loader，这里不用file-loader, 小于10000B的图片base64的方式引入，大于10000B的图片以路径的方式导入
                    name: 'static/img/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000, // 小于10000B的图片base64的方式引入，大于10000B的图片以路径的方式导入
                    name: 'static/fonts/[name].[hash:7].[ext]'
                }
            }
        ]
    },
    optimization: {
        splitChunks: {
          cacheGroups: {
            vendor: {
                test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom|antd)[\\/]/,
                name: 'vendor',
                chunks: 'all',
            },
          }
        }
    },
    // 插件
    plugins:[
        new CleanWebpackPlugin(),
        // ...htmlArray,
        new HtmlWebpackPlugin({
            filename: resolve('./dist/index.html'), // html模板的生成路径
            template: 'index.html',//html模板
            inject: true, // true：默认值，script标签位于html文件的 body 底部
            hash: true, // 在打包的资源插入html会加上hash
            //  html 文件进行压缩
            minify: {
                removeComments: true,               //去注释
                collapseWhitespace: true,           //压缩空格
                removeAttributeQuotes: true         //去除属性 标签的 引号  例如 <p id="test" /> 输出 <p id=test/>
            }
        }),
        new CopyWebpackPlugin({ patterns: [{ from: "./static", to: "./static" }] } )
    ],
    // 开发环境本地启动的服务配置
    devServer: {
        hot:true,
        host:'0.0.0.0',
        contentBase:false,
        port: "8089",
        historyApiFallback:true,
        proxy: {
            '/api':{
                target: 'https://dev-snb-admin-api.sinanbao.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/' 
               }
            },
            '/system':{
                target: 'https://api.sinanbao.com/config',
                changeOrigin: true,
                pathRewrite: {
                    '^/system': '/' 
               }
            }
        }
    }
}