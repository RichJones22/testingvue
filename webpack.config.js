module.exports = {
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            }
        ]
    }
};

const FileWatcherPlugin = require("file-watcher-webpack-plugin");
// ...
