const path = require("path");
const { paths, getLoader, loaderByName } = require("@craco/craco");
const CracoLessPlugin = require("craco-less");
const CracoAntDesignPlugin = require("craco-antd");

module.exports = {
    // plugins: [
    //     { plugin: CracoLessPlugin },
    //     { 
    //         plugin: CracoAntDesignPlugin,
    //         options: {
    //             lessLoaderOptions: {
    //               javascriptEnabled: true
    //             },
    //             cssLoaderOptions: {
    //               modules: true,
    //               localIdentName: "[local]_[hash:base64:5]"
    //             }
    //         }
    //     }
    // ],
    webpack: {
        module: {
            rules: [
                {
                    test: /\.(graphql|gql)$/,
                    exclude: /node_modules/,
                    loader: 'graphql-tag/loader',
                }
            ]
        },
        configure: {
            target: 'web'
        }
    }
};
