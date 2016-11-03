/// <binding />
"use strict";

module.exports = {
    entry: "./app.js",
    output: {
        filename: "./bundle.js"
    },
    module: {
        loaders: [
        ]
    },
    resolve: {
        extensions: ['', '.js']
    }
};