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
}