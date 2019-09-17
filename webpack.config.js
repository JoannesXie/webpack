const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin') //html插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin") //css打包插件
const TerserJSPlugin = require('terser-webpack-plugin'); //js压缩插件
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin") //css压缩插件

module.exports = {
  optimization: { //优化项
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  mode: "production",
  entry: "./src/index.js",
  output: {
    filename: "bunlde.[hash:8].js",
    path: path.resolve(__dirname, 'dist'), // 当前目录下的dist
  },
  plugins: [ //插件，，数组格式
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      minify: {
        // collapseWhitespace: true, //一行显示
      },
      hash: true //hash值
    }),
    new MiniCssExtractPlugin({
      filename: "main.[hash:8].css",
      // hash: true
    })
  ],
  module: {
    rules: [
      // //ESLINT
      // {
      //   test: /\.js$/,
      //   use: {
      //     loader: "eslint-loader",
      //     options: {
      //       enforce: 'pre'  //pre:之前 , post:之后
      //     }
      //   }
      // },
      //babel 转换
      {
        test: /\.js$/,
        use: [{
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              ["@babel/plugin-proposal-decorators", {
                "legacy": true
              }],
              ["@babel/plugin-proposal-class-properties", {
                "loose": true
              }],
              ['@babel/plugin-transform-runtime', {
                corejs: 3
              }]
            ]
          }
        }],
        include: path.resolve(__dirname, 'src'), // 包含路径
        exclude: /node_modules/ // 排除路径
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // 使用 此插件loader替换 style-loader
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          "postcss-loader", // 使用 此loader自动给css添加浏览器样式
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, // 使用 此插件loader替换 style-loader
          // {
          //   loader: 'style-loader',
          //   options: {
          //     insert: 'head',
          //     injectType: 'singletonStyleTag'
          //   }
          // },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          "postcss-loader", // 使用 此loader自动给css添加浏览器样式
          'sass-loader' // 把 scss => css
        ]
      }
    ]
  }
}