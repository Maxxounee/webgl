<template>
	<div class="pixi-image-transitions">
		<div class="nav">
			<!-- https://www.youtube.com/watch?v=Q1uNf54jjgU&t=1615s -->
			<div class="section n0"></div>
			<div class="section n1"></div>
			<div class="section n2"></div>
		</div>
	</div>
</template>

<script>
/* eslint-disable */
import fragment from '/static/assets/shader/fragment.glsl';
import animateValue from 'assets/script/animateValue';
import easing from 'assets/script/easing';

export default {
	data() {
		return {
			loader: undefined,
		};
	},
	mounted() {
		try {
			const PIXI = this.$pixi;
			const app = new PIXI.Application(innerWidth, innerHeight, {
				autoResize: true,
			});
			this.loader = this.$pixi.loader;
			this.loader?.reset();

			this.loader.add('img0', '/assets/images/00.jpg');
			this.loader.add('img1', '/assets/images/01.jpg');
			this.loader.add('img2', '/assets/images/d01.jpeg');

			let Filter;
			Filter = new PIXI.Filter(null, fragment);
			Filter.apply = function(filterManager, input, output, clear) {
				const matrix = new PIXI.Matrix();
				this.uniforms.mappedMatrix = filterManager.calculateNormalizedScreenSpaceMatrix(matrix);
				this.$pixi.Filter.prototype.apply.call(
					this,
					filterManager,
					output,
					input,
					clear,
				);
			};
			this.$el.appendChild(app.view);

			this.loader.load((loader, resources) => {
				Filter = new PIXI.Filter(null, fragment);
				const bunny = new PIXI.Sprite(resources.img0.texture);
				const windowAspect = innerWidth / innerHeight;
				const imageAspect = resources.img1.texture.orig.width / resources.img1.texture.orig.height;

				if (windowAspect > imageAspect) {
					Filter.uniforms.uvAspect = { x: 1, y: imageAspect / windowAspect };
				} else {
					Filter.uniforms.uvAspect = { x: windowAspect / imageAspect, y: 1 };
				}

				bunny.filters = [Filter];

				Filter.uniforms.uTextureOne = resources.img1.texture;
				Filter.uniforms.uTextureTwo = resources.img2.texture;

				Filter.uniforms.uTime = 0.;
				Filter.uniforms.uProgress = 0.;
				app.stage.addChild(bunny);

				app.ticker.add(() => {
					// Filter.uniforms.uProgress += 0.01;
					// Filter.uniforms.uTime += 0.02;
				});

				document.querySelectorAll('.n0, .n1, .n2').forEach((section, index) => {
					section.addEventListener('mouseover', () => {
						animateValue(
							Filter.uniforms,
							{
								start: 'current',
								end: index,
								duration: 500,
								key: 'uProgress',
								easing: easing.sine('in'),
								onUpdate(value) {
									console.log(value);
								},
							},
						);
						console.log('index', index);
					});
				});
			});
		} catch (error) {
			console.log('error', error);
		}
	},
	beforeDestroy() {
		this.loader.destroy();
	},
};
</script>

<style lang="scss">
.pixi-image-transitions {
	.nav {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
		width: 100vw;
		height: 100vh;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
	}

	.section {
		height: 100vh;
		border: 1px solid red;
	}
}
</style>
