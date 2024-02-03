export default {
	plugins: [
		{ src: '@/plugins/pixi', ssr: false },
		{ src: '@/plugins/three', ssr: false },
	],
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
		},
	},
};
