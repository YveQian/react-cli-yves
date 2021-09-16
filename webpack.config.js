const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const chalk = require("chalk");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const OptimizeCSSAssetsPlugin  = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

function resolve(dir) {
    return path.resolve(__dirname, dir)
};


const NODE_ENV = process.env.NODE_ENV;

const webpackConfig = {
    mode:NODE_ENV,
    entry: {},
    output:{
        pathinfo: true,
        filename: 'static/js/[name].bundle.js',
        chunkFilename: 'static/js/[name].chunk.js',
        publicPath: '/',
        path: path.resolve(process.cwd(), 'dist'),
        devtoolModuleFilenameTemplate: info =>
         path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')
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
    optimization: NODE_ENV == "production"?{
        minimizer: [
            // 自定义js优化配置，将会覆盖默认配置
            new UglifyJsPlugin({
                parallel: true,  //使用多进程并行运行来提高构建速度
                sourceMap: false,
                uglifyOptions: {
                    warnings: false,
                    compress: {
                        unused: true,
                        drop_debugger: true,
                        // drop_console: true, 
                    },
                    output: {
                        comments: false // 去掉注释
                    }
                }
            }),
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: { 
                    discardComments: { removeAll: true } // 移除注释
                } 
            })
        ],
        splitChunks: {
          cacheGroups: {
            vendor: {
                test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom|antd)[\\/]/,
                name: 'vendor',
                chunks: 'all',
            },
          }
        }
    }:{},
    // 插件
    plugins:[
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({ patterns: [{ from: "./static", to: "./static" }] } ),
        new ProgressBarPlugin({
            complete: "█",
            format: `${chalk.green('Building')} [ ${chalk.green(':bar')} ] ':msg:' ${chalk.bold('(:percent)')}`,
            clear: true
        })
    ],
    // 开发环境本地启动的服务配置
    devServer: {
        hot:true,
        host:'0.0.0.0',
        contentBase:false,
        port: "8089",
        historyApiFallback:{
            rewrites: [
                // {from: /^\/login/,to: '/admin.html'},
                {from: /.*/g,to: '/admin.html'},
                {from: /^\/page2/,to: '/page2.html'}
            ]

        },
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
const glob = require('glob');

function getEntries(globPath) {
    const files = glob.sync(globPath),
      entries = {};
    files.forEach(function(filepath,index) {
        const split = filepath.split('/');
        const name = split[split.length - 2];
        console.log(filepath.split('/'),'changdu')
        if(filepath.split('/').length>0&&filepath.split('/').length==3){
            entries[name] = './' + filepath        
        }
        
    });
    console.log(entries,'???')
    return entries;
}

const entries = getEntries('src/**/index.js');
 
Object.keys(entries).forEach(function(name) {
   webpackConfig.entry[name] = entries[name];
   const plugin = new HtmlWebpackPlugin({
            filename: resolve(`./dist/${name}.html`), // html模板的生成路径
            template: `index.html`,//html模板
            inject: 'body', // true：默认值，script标签位于html文件的 body 底部
            hash: true, // 在打包的资源插入html会加上hash
            chunks: [name, "vendor"],
            //  html 文件进行压缩
            minify: NODE_ENV == "production"?{
                removeComments: true,               //去注释
                collapseWhitespace: true,           //压缩空格
                removeAttributeQuotes: true         //去除属性 标签的 引号  例如 <p id="test" /> 输出 <p id=test/>
            }:false
    })
   webpackConfig.plugins.push(plugin);
})
module.exports = webpackConfig;