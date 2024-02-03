<template>
	<div class="pixi-game">
	</div>
</template>

<script>
/* eslint-disable */
export default {
	data() {
		return {};
	},
	mounted() {
		try {
			const app = new this.$pixi.Application(
				{ antialias: true },
			);
			const PIXI = this.$pixi;
			app.renderer.backgroundColor = 0x201e21;
			app.renderer.resize(innerWidth, innerHeight);
			app.renderer.view.style.position = 'absolute';
			this.$el.appendChild(app.view);

			const loader = new PIXI.loaders.Loader();

			/** JSON map */
			loader
				.add('tile', '/assets/images/tiles/walking/right.json')
				.load(setup);

			function setup(loader, resources) {
				const textures = [];
				for (let i = 1; i < 10; i++) {
					const texture = PIXI.Texture.from(`${i}.png`);
					textures.push(texture);
				}
				const walkingLeft = new PIXI.extras.AnimatedSprite(textures);
				walkingLeft.position.set(100, 100);
				app.stage.addChild(walkingLeft);
				walkingLeft.play();
				walkingLeft.animationSpeed = 0.2;
			}
		} catch (error) {
			console.warn('Ошибка', error);
		}
	},
};
</script>

<style lang="scss">
.pixi-game {
}
</style>
