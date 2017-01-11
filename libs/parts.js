/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import NpmInstallPlugin from 'npm-install-webpack-plugin'
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import htmlTemplate from 'html-webpack-template'

export function indexTemplate (options) {
  return {
    plugins: [
      new HtmlWebpackPlugin({
        template: htmlTemplate,
        title: options.title,
        appMountId: options.appMountId,
        inject: false
      })
    ]
  }
}

export function devServer (options) {
  return {
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      stats: 'errors-only',
      host: options.host,
      port: options.port
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin({
        multiStep: true
      })
    ]
  }
}

export function setupCSS (paths) {
  return {
    module: {
      loaders: [
        {
          test: /\.css$/,
          loaders: ['style', 'css'],
          include: paths
        }
      ]
    }
  }
}

export function minify () {
  return {
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]
  }
}

export function setFreeVariable (key, value) {
  const env = {}
  env[key] = JSON.stringify(value)

  return {
    plugins: [
      new webpack.DefinePlugin(env)
    ]
  }
}

export function extractBundle (options) {
  const entry = {}
  entry[options.name] = options.entries

  return {
    entry,
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        names: [options.name, 'manifest']
      })
    ]
  }
}

export function extractCSS (paths) {
  return {
    module: {
      loaders: [
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style', 'css'),
          include: paths
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin('[name].[chunkhash].css')
    ]
  }
}

export function npmInstall (options) {
  const opts = options || {}
  return {
    plugins: [
      new NpmInstallPlugin(opts)
    ]
  }
}
