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
		const app = new this.$pixi.Application(
			{ antialias: true },
		);
		const Graphics = this.$pixi.Graphics;

		app.renderer.backgroundColor = 0x201e21;
		app.renderer.resize(innerWidth, innerHeight);
		app.renderer.view.style.position = 'absolute';
		this.$el.appendChild(app.view);

		const circle = new Graphics();
		circle
			.beginFill(0x22AACC)
			.drawCircle(440, 200, 80)
			.endFill();
		app.stage.addChild(circle);

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

		const line = new Graphics();
		line
			.lineStyle(5, 0xFFEA00, 1)
			.moveTo(700, 100)
			.lineTo(700, 800);
		app.stage.addChild(line);

		const style = new this.$pixi.TextStyle({
			fontFamily: 'Roboto',
			fontSize: 48,
			fill: '#129d32',
		});

		const myText = new this.$pixi.Text('hello world', style);
		app.stage.addChild(myText);
		myText.text = 'Text changed';

		app.ticker.add((delta) => loop(delta));

		function loop(delta) {
			const rectangle = new Graphics();
			rectangle
				.beginFill(0xAA1241)
				.lineStyle(4, 0xFEFAFF)
				.drawRect(Math.random() * app.screen.width, Math.random() * app.screen.height, 100, 120)
				.endFill();
			app.stage.addChild(rectangle);
		}
	},
};
</script>

<style lang="scss">
.pixi-game {
}
</style>
