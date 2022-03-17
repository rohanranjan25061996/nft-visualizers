module.exports = {
    resolve: {
        fallback: {
          "path": require.resolve("path-browserify"),
          "os": require.resolve("os-browserify/browser"),
          "https": require.resolve("https-browserify"),
          "http": require.resolve("stream-http"),
          "assert": require.resolve("assert/"),
          "crypto": require.resolve('crypto-browserify'),
          "stream": require.resolve("stream-browserify"),
        }
      },
    }

// const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
// console.log("yahio => ", NodePolyfillPlugin)

// module.exports = {
// 	// Other rules...
// 	plugins: [
// 		new NodePolyfillPlugin()
// 	]
// }

// module.exports = {
// 	target: 'node',
//    };