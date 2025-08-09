const path = require('path');

module.exports = {
  entry: {
    app: './src/index.js',
    'quotation-app': './src/quotation-app.js',
    blocks: './blocks/blocks.js',
    'hero-section': './blocks/hero-section/src/index.js',
    'steps-guide': './blocks/steps-guide/src/index.js',
    'invoice-components': './blocks/invoice-components/src/index.js',
    'benefits-section': './blocks/benefits-section/src/index.js',
    'best-practices': './blocks/best-practices/src/index.js',
    'legal-compliance': './blocks/legal-compliance/src/index.js',
    'faq-section': './blocks/faq-section/src/index.js',
    'related-tools': './blocks/related-tools/src/index.js',
    'taskip-cta': './blocks/taskip-cta/src/index.js',
    'features-section': './blocks/features-section/src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    '@wordpress/element': 'wp.element',
    '@wordpress/components': 'wp.components',
    '@wordpress/i18n': 'wp.i18n',
    '@wordpress/blocks': 'wp.blocks',
    '@wordpress/block-editor': 'wp.blockEditor',
    '@wordpress/editor': 'wp.editor'
  }
};