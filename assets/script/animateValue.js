function _validate(target, opt) {
	/* TODO: валидация */
	if (typeof target !== 'object' || typeof opt !== 'object') {
		console.warn('AnimatedIncrement: неверный тип переданных параметров');
		return false;
	}
	return true;
}

function _animateValue(target, opt) {
	let startTime;
	let stopFlag = false;

	function run(time) {
		if (stopFlag) { return null; }
		if (!startTime) { startTime = time; }

		const remaining = opt.easing(Math.min((time - startTime) / opt.duration, 1));

		const value = opt.start + opt.range * remaining;

		opt.onUpdate(value);

		if (value !== opt.end) {
			target[opt.key] = value;
			requestAnimationFrame(run);
		} else {
			target[opt.key] = value;
			opt.onFinish(value);
		}
	}

	requestAnimationFrame(run);
	return {
		stop() {
			stopFlag = true;
		},
	};
}

/** Инкрементация значения во времени.
 *
 * @param {object} target - Объект, в котором меняется
 * значение (для объекта необходим ключ opt.key)
 *
 * @param {{duration: number, start: string, end: number, onUpdate(*): void, key: string}} options - Опции
 *
 * @param {number, string} options.start - Начальное значение. Принимает число или 'current', при котором начальным
 *     значением становится текущее значение target;
 *
 * @param {number} options.end - Конечое значение
 *
 * @param {number} options.duration - Время выполнения функции
 *
 * @param {function} options.easing - Функция кривой
 *
 * @param {function} options.onUpdate - Callback. Выполняется при каждой итерации
 *
 * @param {function} options.onFinish - Callback. Выполняется по окончанию
 *
 * @param {number, string} options.key - Ключ для target, если target является объектом
 *
 * @example
 * animateValue(
 * 	object.objectWithAnimatedValue,
 * 	{
 * 		start: 'current',
 * 		end: 69,
 * 		duration: 500,
 * 		key: 'keyInObject',
 * 		easing: easing.sine.inOut,
 * 		onUpdate(value) {
 * 			console.log(value);
 * 		},
 * 	},
 * )
 * */

export default function main(target, options) {
	if (!_validate(target, options)) {
		return;
	}
	const opt = {
		key: null,
		start: null,
		end: null,
		range: null,
		duration: 1000,
		easing(value) {
			return value;
		},
		onUpdate() {
		},
		onFinish() {
		},
		...options,
	};
	opt.start = options.start === 'current' ? target[opt.key] : options.start;

	opt.range = options.end - opt.start;

	const { stop } = _animateValue(target, opt);
	return {
		stop,
	};
}
