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
			const Graphics = this.$pixi.Graphics;

			app.renderer.backgroundColor = 0x201e21;
			app.renderer.resize(innerWidth, innerHeight);
			app.renderer.view.style.position = 'absolute';
			this.$el.appendChild(app.view);

			/* Вариант создания изображения 1 */
			// const char1Texture = this.$pixi.Texture.from('/assets/images/00-texture.jpg');
			// const char1Sprite = new this.$pixi.Sprite(char1Texture);

			/* Вариант создания изображения 2 */
			const char1Sprite = this.$pixi.Sprite.from('/assets/images/chars/00.png');

			char1Sprite.width = 100;
			char1Sprite.height = 130;

			/* Вариант 1 */
			// char1Sprite.scale.x = 1.1;
			// char1Sprite.scale.y = 1.1;
			char1Sprite.x = 100;
			char1Sprite.y = 200;

			/* Вариант 2 */
			// char1Sprite.scale.set(1.1, 1.1);
			char1Sprite.position.set(100, 200);

			/* Transform origin */
			char1Sprite.anchor.x = 0.5;
			char1Sprite.anchor.y = 0.5;

			app.stage.addChild(char1Sprite);
			app.ticker.add(loop);

			function loop() {
				// char1Sprite.x++;
				// char1Sprite.rotation += 0.01;
			}

			/* События. Установить interactive */
			char1Sprite.interactive = true;
			/* Курсор pointer */
			char1Sprite.buttonMode = true;

			char1Sprite.on('pointerdown', () => {
				// char1Sprite.scale.x += 0.01;
				// char1Sprite.scale.y += 0.01;
			});

			/* Управление */
			document.addEventListener('keydown', (event) => {
				if (event.key === 'ArrowRight') {
					char1Sprite.x += 10;
				}
				if (event.key === 'ArrowLeft') {
					char1Sprite.x -= 10;
				}
			});

			/* Первый тип контейнера */
			const container = new this.$pixi.Container();
			const char2Sprite = this.$pixi.Sprite.from('/assets/images/chars/10.png');
			const char3Sprite = this.$pixi.Sprite.from('/assets/images/chars/20.png');

			container.addChild(char2Sprite);
			container.addChild(char3Sprite);

			app.stage.addChild(container);
			char2Sprite.position.set(250, 50);
			container.x = 200;

			console.log('Положение относительно контейнера - ', char2Sprite.x);
			console.log('Абсолютное положение - ', char2Sprite.getGlobalPosition().x);
			console.log('Спрайты в контейрене - ', container.children);

			/* Второй тип контейнера. Более быстрый, но с ограничениями */
			const particleContainer = new this.$pixi.particles.ParticleContainer(1000, {
				position: true,
				rotation: true,
				vertices: true,
				tint: true,
				uvs: true,
			});

			const loader = new this.$pixi.loaders.Loader();

			/** Первый вариант добавления изображения в загрузчик */

			// const setup = (loader, resources) => {
			// 	const char4Sprite = new this.$pixi.Sprite(
			// 		resources.char4Texture.texture,
			// 	);
			// 	char4Sprite.y = 200;
			// 	app.stage.addChild(char4Sprite);
			// };
			//
			// loader
			// 	.add('char4Texture', '/assets/images/chars/30.png')
			// 	.add('char5Texture', '/assets/images/chars/40.png')
			// 	.load(setup);

			/** Второй вариант добавления изображения в загрузчик */

			const setup = (loader, resources) => {
				const char4Sprite = new this.$pixi.Sprite(
					resources['/assets/images/chars/30.png'].texture,
				);
				const char5Sprite = new this.$pixi.Sprite(
					resources['/assets/images/chars/40.png'].texture,
				);
				char4Sprite.y = 200;
				char5Sprite.y = 200;
				char5Sprite.x = 500;
				app.stage.addChild(char4Sprite);
				app.stage.addChild(char5Sprite);
			};

			loader
				.add(['/assets/images/chars/30.png', '/assets/images/chars/40.png'])
				.load(setup);

			loader.onLoad.add(() => console.log('on load'));
			loader.onError.add(() => console.log('on error'));
			loader.onProgress.add(() => console.log('on progress'));

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
