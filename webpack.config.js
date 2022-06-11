const path = require('path');
const Dotenv = require('dotenv-webpack');


function resolve(dir) {
  return path.resolve(__dirname,"..",dir)
}

module.exports = {
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
  plugins: [
    new Dotenv({
      path: `./.env.${process.env.NODE_ENV}`,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
      {
        test: /.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader', // 架桥梁
        options: {
          presets: [
            [
              '@babel/preset-env', // 将ES6语法转成ES5
              {
                // 低版本浏览器中只补充项目中使用到的ES6语法
                useBuiltIns: 'usage',
              },
            ],
          ],
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts','.tsx','.js'],
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
  devServer: {
    port: 3008,
  },
  watch: true,
  watchOptions: {
    ignored: /node_modules/,
  },
};
