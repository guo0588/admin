const path = require("path");

function resolve(dir) {
	return path.join(__dirname, dir);
}

module.exports = {
	publicPath: '/admin',
	
	configureWebpack: {
		resolve: {
			alias: {
				'@': resolve('src'),
			}
		}
	},
	chainWebpack: config => {
		const svgRule = config.module.rule('svg')
		svgRule.uses.clear()
		svgRule
			.test(/\.svg$/)
			.include.add(path.resolve(__dirname, './src/icons')).end()
			.use('svg-sprite-loader')
			.loader('svg-sprite-loader')
			.options({
				symbolId: 'icon-[name]'
			})
		const fileRule = config.module.rule('file')
		fileRule.uses.clear()
		fileRule
			.test(/\.svg$/)
			.exclude.add(path.resolve(__dirname, './src/icons'))
			.end()
			.use('file-loader')
			.loader('file-loader')
	},
}
