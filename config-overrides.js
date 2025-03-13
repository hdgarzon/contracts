const { override } = require('customize-cra');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin');
const HtmlInlineCssPlugin = require('html-inline-css-webpack-plugin').default;

module.exports = override(
  (config) => {
    // Eliminar todos los plugins HtmlWebpackPlugin existentes
    config.plugins = config.plugins.filter(
      (plugin) => !(plugin instanceof HtmlWebpackPlugin)
    );
    
    // Agregar un nuevo plugin HtmlWebpackPlugin configurado para minimizar
    config.plugins.push(
      new HtmlWebpackPlugin({
        inject: true,
        template: 'public/index.html',
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true
        },
        // No incluir el manifest.json
        excludeChunks: ['manifest']
      })
    );
    
    // Agregar plugins para incrustación en línea de JS y CSS
    config.plugins.push(new HtmlInlineScriptPlugin());
    config.plugins.push(new HtmlInlineCssPlugin());
    
    // Desactivar la división de código (code splitting)
    config.optimization = {
      ...config.optimization,
      runtimeChunk: false,
      splitChunks: {
        cacheGroups: {
          default: false
        }
      }
    };
    
    // Simplificar la salida para que todo vaya a un solo archivo
    config.output = {
      ...config.output,
      filename: 'bundle.js',
      chunkFilename: 'bundle.js'
    };
    
    return config;
  }
);