/// <binding />
"use strict";

module.exports = {
    entry: "./app.js",
    output: {
        filename: "bundle.js",
        path: __dirname
    },
    resolve: {
        extensions: ['.js']
    }
};