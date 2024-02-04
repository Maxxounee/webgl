<template>
	<div class="mousemove-displacement">
		<!--https://www.youtube.com/watch?v=8DH13eslS3U-->
	</div>
</template>

<script>
/* eslint-disable */
import animateValue from '@/assets/script/animateValue';
import easing from 'assets/script/easing';

export default {
	data() {
		return {
			key: 69,
		};
	},
	mounted() {
		const PIXI = this.$pixi;
		const app = new PIXI.Application(innerWidth, innerHeight);
		this.$el.appendChild(app.view);

		const container = new PIXI.Container();
		const imageContainer = new PIXI.Container();
		const textContainer = new PIXI.Container();
		const sprite = new PIXI.Sprite.fromImage('/assets/images/bg/03.jpg');
		const displacementSprite = PIXI.Sprite.fromImage('/assets/images/displacement/00.png');
		const displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);
		const text = new PIXI.Text(
			'hellow\nguis',
			{ fontFamily: 'Roboto', fontSize: 106, fill: '#FFF' },
		);

		sprite.width = innerWidth;
		sprite.height = innerHeight;
		displacementSprite.anchor.set(0.5);
		displacementFilter.scale.set(0);
		text.x = 30;
		text.y = 90;

		textContainer.filters = [displacementFilter];

		imageContainer.addChild(sprite);
		textContainer.addChild(text);

		container
			.addChild(imageContainer)
			.addChild(textContainer);

		app.stage
		   .addChild(container)
		   .addChild(displacementSprite);

		app.ticker.add((delta) => {
			app.renderer.render(container);
		});

		document.body.addEventListener('click', () => {
			const tl = this.$anime.timeline({
				easing: easing.string.quart('inOut', true),
				duration: 1150,
			});
			tl
				.add({
					targets: displacementFilter.scale,
					x: 600,
					y: 10,
				})
				.add({
					targets: text.position,
					x: 100,
				}, 0)
				.add({
					targets: text,
					alpha: 0,
				}, 0)
			;
		});
	},
};
</script>

<style lang="scss">

</style>
