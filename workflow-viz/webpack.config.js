const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

//console.log(path.join(__dirname, 'components/mxgraph/javascript/mxClient.js'));

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash:8].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }, {
                test: /mxClient\.js$/,
                loader: 'exports-loader?mxGraph,mxGraphModel,mxToolbar,mxDragSource,mxRubberband,mxKeyHandler,mxCell,mxGeometry,mxUtils'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'Output Management',
            template: 'index.html'
        }),
        new CopyWebpackPlugin([
            {from: path.join(__dirname, 'src/assets/mxgraph/images'), to: './images'},
            {from: path.join(__dirname, 'src/assets/mxgraph/css'), to: './css'},
            {from: path.join(__dirname, 'src/assets/mxgraph/resources'), to: './resources'}
        ])
    ],
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    }
};