import Vue from 'vue';
import * as PIXI from 'pixi.js';

PIXI.utils.skipHello();

const pixiPrototype = {
	install(Vue) {
		Vue.prototype.$pixi = PIXI;
	},
};
Vue.use(pixiPrototype);
