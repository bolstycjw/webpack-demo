/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import path from 'path'
import merge from 'webpack-merge'
import validate from 'webpack-validator'
import {
  indexTemplate,
  setFreeVariable,
  extractBundle,
  minify,
  extractCSS,
  setupCSS,
  devServer,
  npmInstall,
} from './libs/parts'

const TARGET = process.env.npm_lifecycle_event
process.env.BABEL_ENV = TARGET

const PATHS = {
  app: path.join(__dirname, 'app'),
  style: path.join(__dirname, 'app', 'main.css'),
  build: path.join(__dirname, 'build'),
}

const common = merge(
  {
    resolve: {
      root: PATHS.app,
      modulesDirectories: ['node_modules'],
      extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.json'],
    },
    module: {
      preLoaders: [
        {
          test: /\.jsx?$/,
          loaders: ['eslint'],
          include: PATHS.app,
        },
      ],
      loaders: [
        {
          test: /\.jsx?$/,
          loaders: ['babel?cacheDirectory'],
          include: PATHS.app,
        },
      ],
    },
    entry: {
      style: PATHS.style,
      app: PATHS.app,
    },
    output: {
      path: PATHS.build,
      filename: '[name].js',
    },
  },
  indexTemplate({
    title: 'Kanban Demo',
    appMountId: 'app',
  }),
)

let config

switch (process.env.npm_lifecycle_event) {
  case 'build':
  case 'stats':
    config = merge(
      common,
      {
        devtool: 'source-map',
        output: {
          path: PATHS.build,
          filename: '[name].[chunkhash].js',
          chunkFilename: '[chunkhash].js',
        },
      },
      setFreeVariable(
        'process.env.NODE_ENV',
        'production',
      ),
      extractBundle({
        name: 'vendor',
        entries: ['react'],
      }),
      minify(),
      extractCSS(PATHS.style),
    )
    break
  default:
    config = merge(
      common,
      {
        devtool: 'eval-source-map',
      },
      setupCSS(PATHS.app),
      devServer({
        host: process.env.HOST,
        port: process.env.PORT,
      }),
      npmInstall(),
    )
}

export default validate(config, { quiet: true })
