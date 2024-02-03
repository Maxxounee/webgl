import { join } from 'path';

export default {
	plugins: [
		{ src: '@/plugins/pixi', ssr: false },
		{ src: '@/plugins/three', ssr: false },
		// { src: join(__dirname, 'node_modules/@pixi/graphics-extras'), ssr: false },
	],

	loading: {
		color: 'blue',
		height: '522px',
	},
	components: true,
	buildModules: [
		'@nuxtjs/eslint-module',
	],
	css: [
		'@/assets/style/default.scss',
	],
	build: {
		extend(config) {
			config.module.rules.push({
				test: /\.(glsl|vs|fs|vert|frag)$/,
				loader: 'webpack-glsl-loader',
			});
			// config.module.rules.push({
			// 	test: /\.(js|mjs)$/,
			// 	include: join(__dirname, 'node_modules/@pixi'),
			// 	loader: 'babel-loader',
			// });
		},
	},
};
