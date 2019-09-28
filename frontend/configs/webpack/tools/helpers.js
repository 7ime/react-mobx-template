const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = require('./paths');

//process cwd возвращает текущую рабочую директорию Node.js (там где папка node_modules); 
const appDirectory = fs.realpathSync(process.cwd());

//helper для получения пути относительно корня каталога (appDirectory)
const resolvePath = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  htmlWebpackPluginHelper: function (entryPoints, config) {
    const result = [];

    entryPoints.forEach((entryPoint) => {
      const endConfig = {
        ...config,
        inject: true,
        filename: `${entryPoint}.html`,
        template: resolvePath(`${paths.public}/${entryPoint}.html`),
        chunks: [entryPoint]
      };

      result.push(new HtmlWebpackPlugin(endConfig));
    });

    return result;
  },
  entryPoinstHelper: function (entryPoints) {
    const result = {};

    entryPoints.forEach((entryPoint) => {
      result[entryPoint] = `./entry-points/${entryPoint}/index.tsx`;
    });

    return result;
  },
  resolvePath,
  appDirectory
};
