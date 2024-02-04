/* eslint-disable */
const _dict = {
	'in': 'easeIn',
	'out': 'easeInOut',
	'inOut': 'easeInOut',
};

function sine(type) {
	const ease = {
		easeIn(value) {
			return 1 - Math.cos((value * Math.PI) / 2);
		},
		easeOut(value) {
			return Math.sin((value * Math.PI) / 2);
		},
		easeInOut(value) {
			return -(Math.cos(value * Math.PI) - 1) / 2;
		},
	};
	return ease[_dict[type] ?? 'easeInOut'];
}

function quad(type) {
	const ease = {
		in(value) {
			return Math.pow(value, 2);
		},
		out(value) {
			return 1 - Math.pow((1 - value) * (1 - value), 2);
		},
		inOut(value) {
			return value < 0.5 ? 2 * Math.pow(value, 2) : 1 - Math.pow(-2 * value + 2, 2) / 2;
		},
	};
	return ease[_dict[type] ?? 'easeInOut'];
}

function cubic(type) {
	const ease = {
		in(value) {
			return Math.pow(value, 3);
		},
		out(value) {
			return 1 - Math.pow(1 - value, 3);
		},
		inOut(value) {
			return value < 0.5 ? 4 * Math.pow(value, 3) : 1 - Math.pow(-2 * value + 2, 3) / 2;
		},
	};
	return ease[_dict[type] ?? 'easeInOut'];
}

function quart(type) {
	const ease = {
		in(value) {
			return Math.pow(value, 4);
		},
		out(value) {
			return 1 - Math.pow(1 - value, 4);
		},
		inOut(value) {
			return value < 0.5 ? 8 * Math.pow(value, 4) : 1 - Math.pow(-2 * value + 2, 4) / 2;
		},
	};
	return ease[_dict[type] ?? 'easeInOut'];
}

function quint(type) {
	const ease = {
		in(value) {
			return Math.pow(value, 5);
		},
		out(value) {
			return 1 - Math.pow(1 - value, 5);
		},
		inOut(value) {
			return value < 0.5 ? 16 * Math.pow(value, 5) : 1 - Math.pow(-2 * value + 2, 5) / 2;
		},
	};
	return ease[_dict[type] ?? 'easeInOut'];
}

function expo(type) {
	const ease = {
		in(value) {
			return value === 0 ? 0 : Math.pow(2, 10 * value - 10);
		},
		out(value) {
			return value === 1 ? 1 : 1 - Math.pow(2, -10 * value);
		},
		inOut(value) {
			return value === 0
				? 0
				: value === 1
					? 1
					: value < 0.5 ? Math.pow(2, 20 * value - 10) / 2
						: (2 - Math.pow(2, -20 * value + 10)) / 2;
		},
	};
	return ease[_dict[type] ?? 'easeInOut'];
}

function circ(type) {
	const ease = {
		in(value) {
			return 1 - Math.sqrt(1 - Math.pow(value, 2));
		},
		out(value) {
			return Math.sqrt(1 - Math.pow(value - 1, 2));
		},
		inOut(value) {
			return value < 0.5
				? (1 - Math.sqrt(1 - Math.pow(2 * value, 2))) / 2
				: (Math.sqrt(1 - Math.pow(-2 * value + 2, 2)) + 1) / 2;
		},
	};
	return ease[_dict[type] ?? 'easeInOut'];
}

function back(type) {
	const ease = {
		in(value) {
			const c1 = 1.70158;
			const c3 = c1 + 1;

			return c3 * Math.pow(value, 3) - c1 * Math.pow(value, 2);
		},
		out(value) {
			const c1 = 1.70158;
			const c3 = c1 + 1;

			return 1 + c3 * Math.pow(value - 1, 3) + c1 * Math.pow(value - 1, 2);
		},
		inOut(value) {
			const c1 = 1.70158;
			const c2 = c1 * 1.525;

			return value < 0.5
				? (Math.pow(2 * value, 2) * ((c2 + 1) * 2 * value - c2)) / 2
				: (Math.pow(2 * value - 2, 2) * ((c2 + 1) * (value * 2 - 2) + c2) + 2) / 2;
		},
	};
	return ease[_dict[type] ?? 'easeInOut'];
}

const string = {
	sine(type, camelCase = false) {
		const ease = {
			in: '(0.12, 0, 0.39, 0)',
			out: '(0.61, 1, 0.88, 1)',
			inOut: '(0.37, 0, 0.63, 1)',
		};
		return (camelCase ? 'cubicBezier' : 'cubic-bezier') + ease[type];
	},
	quad(type, camelCase = false) {
		const ease = {
			in: '(0.11, 0, 0.5, 0)',
			out: '(0.5, 1, 0.89, 1)',
			inOut: '(0.45, 0, 0.55, 1)',
		};
		return (camelCase ? 'cubicBezier' : 'cubic-bezier') + ease[type];
	},
	cubic(type, camelCase = false) {
		const ease = {
			in: '(0.32, 0, 0.67, 0)',
			out: '(0.33, 1, 0.68, 1)',
			inOut: '(0.65, 0, 0.35, 1)',
		};
		return (camelCase ? 'cubicBezier' : 'cubic-bezier') + ease[type];
	},
	quart(type, camelCase = false) {
		const ease = {
			in: '(0.5, 0, 0.75, 0)',
			out: '(0.25, 1, 0.5, 1)',
			inOut: '(0.76, 0, 0.24, 1)',
		};
		return (camelCase ? 'cubicBezier' : 'cubic-bezier') + ease[type];
	},
	quint(type, camelCase = false) {
		const ease = {
			in: '(0.64, 0, 0.78, 0)',
			out: '(0.22, 1, 0.36, 1)',
			inOut: '(0.83, 0, 0.17, 1)',
		};
		return (camelCase ? 'cubicBezier' : 'cubic-bezier') + ease[type];
	},
	expo(type, camelCase = false) {
		const ease = {
			in: '(0.7, 0, 0.84, 0)',
			out: '(0.16, 1, 0.3, 1)',
			inOut: '(0.87, 0, 0.13, 1)',
		};
		return (camelCase ? 'cubicBezier' : 'cubic-bezier') + ease[type];
	},
	circ(type, camelCase = false) {
		const ease = {
			in: '(0.55, 0, 1, 0.45)',
			out: '(0, 0.55, 0.45, 1)',
			inOut: '(0.85, 0, 0.15, 1)',
		};
		return (camelCase ? 'cubicBezier' : 'cubic-bezier') + ease[type];
	},
	back(type, camelCase = false) {
		const ease = {
			in: '(0.36, 0, 0.66, -0.56)',
			out: '(0.34, 1.56, 0.64, 1)',
			inOut: '(0.68, -0.6, 0.32, 1.6)',
		};
		return (camelCase ? 'cubicBezier' : 'cubic-bezier') + ease[type];
	},
};
export default {
	sine,
	quad,
	cubic,
	quart,
	quint,
	expo,
	circ,
	back,
	string,
};
