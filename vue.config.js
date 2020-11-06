const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    publicPath: './',
    lintOnSave: false,
    devServer: {
        host: 'localhost',
        port: 8080
    },
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('components', resolve('src/components'));
    },
    configureWebpack: {
        devtool: 'souce-map'
    }
};
