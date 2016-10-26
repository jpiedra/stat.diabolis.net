var webpack = require('webpack');

module.exports = {
  entry: './src/js/entry.js',
  output: {
    path: __dirname,
	  filename: 'app.js'
  },
  module: {
	  loaders: [
        { test: /\.css$/, loader: 'style!css' },
	      { test: /\.js$/, loader: 'babel-loader', query: 
          { presets: ['react', 'es2015'] }
        }
	  ]
  }
  //plugins: process.env.NODE_ENV === 'production' ? [
  //  new webpack.DefinePlugin({
  //    'process.env':{
  //      'NODE_ENV': JSON.stringify('production')
  //    }
  //  }),
  //  new webpack.optimize.DedupePlugin(),
  //  new webpack.optimize.OccurrenceOrderPlugin(),
  //  new webpack.optimize.UglifyJsPlugin()
  //] : [],
}
