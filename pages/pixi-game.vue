<template>
	<div class="pixi-game">

	</div>
</template>

<script>
/* eslint-disable */
export default {
	data() {
		return {
			key: 123,
		};
	},
	mounted() {
		const app = new this.$pixi.Application(
			{
				antialias: true,
			},
		);
		app.renderer.backgroundColor = 0x423123;
		app.renderer.resize(innerWidth, innerHeight);
		app.renderer.view.style.position = 'absolute';
		this.$el.appendChild(app.view);

		const Graphics = this.$pixi.Graphics;

		const rectangle = new Graphics();
		rectangle
			.beginFill(0xAA1241)
			.lineStyle(4, 0xFEFAFF)
			.drawRect(200, 300, 100, 120)
			.endFill();
		app.stage.addChild(rectangle);

		const poly = new Graphics();
		poly
			.beginFill(0xFF66FF)
			.drawPolygon([
				600, 50,
				800, 150,
				900, 300,
				400, 400,
			])
			.endFill();

		app.stage.addChild(poly);

		// const circle;
	},
};
</script>

<style lang="scss">
.pixi-game {
}
</style>
