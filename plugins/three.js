import Vue from 'vue';
import * as THREE from 'three';

const threePrototype = {
	install(Vue) {
		Vue.prototype.$three = THREE;
	},
};
Vue.use(threePrototype);
// export default PIXI;
