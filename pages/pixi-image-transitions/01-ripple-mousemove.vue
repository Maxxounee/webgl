<template>
	<div class="ripple-mousemove">
		<!--https://www.youtube.com/watch?v=tiRtRS-W-aE-->
	</div>
</template>

<script>
/* eslint-disable */
export default {
	data() {
		return {
			bgSrc: '/assets/images/ripple-mousemove/bg.jpg',
			displacementSrc: '/assets/images/ripple-mousemove/ripple.png',
			posX: 0,
			vx: 0,
			displacementSprite: null,
			displacementFilter: null,
		};
	},
	mounted() {
		try {
			const PIXI = this.$pixi;
			const app = new PIXI.Application(innerWidth, innerHeight);
			this.$el.appendChild(app.view);
			app.stage.interactive = true;
			const container = new PIXI.Container();
			app.stage.addChild(container);

			const setup = (loader, resources) => {
				const centerX = app.renderer.width / 2;
				const centerY = app.renderer.height / 2;
				this.posX = centerX;
				this.vx = centerX;

				this.displacementSprite = new PIXI.Sprite(resources.displacement.texture);
				this.displacementFilter = new PIXI.filters.DisplacementFilter(this.displacementSprite);
				this.displacementSprite.anchor.set(0.5);
				this.displacementSprite.x = centerX;
				this.displacementSprite.y = centerY;
				container.filters = [this.displacementFilter];
				this.displacementFilter.scale.y = 0;
				app.stage.addChild(this.displacementSprite);

				const bgSprite = new PIXI.Sprite(resources.bg.texture);
				bgSprite.width = app.renderer.width;
				bgSprite.height = app.renderer.height;
				container.addChild(bgSprite);

				app.stage.on('mousemove', (event) => {
					this.posX = event.data.global.x;
				});

				app.ticker.add(() => {
					this.vx += (this.posX - this.displacementSprite.x) * 0.045;
					this.displacementSprite.x = this.vx;
					let disp = Math.floor(this.posX - this.displacementSprite.x);
					if (disp < 0) {
						disp = -disp;
					}
					this.displacementSprite.scale.x = map(disp, 0, 500, 0.1, 0.6);
					/* непонятно зачем */
					// this.displacementFilter.scale.x = map(disp, 0, 500, 0, 120);
				});
			};

			PIXI.loader
				.add('bg', this.bgSrc)
				.add('displacement', this.displacementSrc)
				.load(setup);

			function map(n, start1, stop1, start2, stop2) {
				return (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
			}
		} catch (error) {
			console.log('error', error);
		}
	},
};
</script>

<style lang="scss">
.ripple-mousemove {
}
</style>
