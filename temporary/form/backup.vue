<template>
	<div
		class="Form"
		:class="formClass"
	>
		<div
			class="Form_screen Form_screen-inputs"
			:class="{ 'Form_screen-active': !result }"
		>
			<slot></slot>
			<div
				v-for="(value, key) in fields"
				:key="key"
				class="Form_input"
				:class="`Form_input-${value.type || 'text'}`"
			>
				<textarea
					v-if="value.type === 'textarea'"
					v-model.trim="values[value.name]"
					:placeholder="value.placeholder"
				></textarea>
				<TheMask
					v-else-if="value.mask"
					ref="TheMask"
					v-model="values[value.name]"
					:mask="value.mask"
					:masked="true"
					:placeholder="placeholders[value.name]"
					:type="value.type || 'text'"
					@focus.native="(e) => { setStartValue(e, value) }"
					@blur.native="(e) => { maskBlur(e, value) }"
				/>
				<input
					v-else
					v-model.trim="values[value.name]"
					:placeholder="value.placeholder"
					:type="value.type || 'text'"
				/>
				<div class="Form_input_line"></div>
			</div>
			<div
				v-if="agree"
				class="Form_agree"
				:class="{ 'Form_agree-active': agreeActive }"
				@click="agreeToggle()"
			>
				<div class="Form_agree_icon"></div>
				<div
					class="Form_agree_text"
					v-html="agree"
				></div>
			</div>
			<div
				class="Form_send"
				:class="{ 'Form_send-active': available }"
				@click="send()"
			>
				<slot name="send-btn"></slot>
			</div>
		</div>
		<div
			class="Form_screen Form_screen-error"
			:class="{ 'Form_screen-active': result === 'error' }"
		>
			<slot name="screen-error">Произошла ошибка, пожалуйcта попробуйте
				позже.
			</slot>
		</div>
		<div
			class="Form_screen Form_screen-success"
			:class="{ 'Form_screen-active': result === 'success' }"
		>
			<slot name="screen-success">Заявка отправлена, мы свяжемся с Вами в
				ближайшее время.
			</slot>
		</div>
	</div>
</template>

<script>
import { TheMask } from 'vue-the-mask';

export default {
	components: {
		TheMask,
	},
	props: {
		fields: {
			type: Array,
			default: () => ([]),
		},
		type: {
			type: String,
			default: 'callback',
		},
		agree: {
			type: String,
			default: null,
		},
		additional: {
			type: Object,
			default: () => ({}),
		},
		sendDisabled: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			values: {},
			result: null,
			agreeActive: false,
			placeholders: {},
		};
	},
	computed: {
		available() {
			return ((!this.agree || this.agreeActive) && !this.sendDisabled) && this.fields.every((item) => {
				const value = this.values[item.name];
				let available;
				if (!item.required) {
					available = true;
				}
				if (value) {
					if (item.mask && value.replace(/\d/g, '#') === item.mask.replace(/\d/g, '#')) {
						available = true;
					}
					if ((item.name === 'email' || item.type === 'email') && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
						available = true;
					}
					if (!item.mask && item.name !== 'email' && item.type !== 'email') {
						available = true;
					}
				}
				return available;
			});
		},
		formClass() {
			if (this.result) {
				return `Form-${this.result}`;
			}
			return 'Form-inputs';
		},
		startPlaceholders() {
			const placeholders = {};
			this.fields.forEach(function(item) {
				placeholders[item.name] = item.placeholder;
			});
			return placeholders;
		},
	},
	mounted() {
		this.placeholders = this.startPlaceholders;
	},
	methods: {
		agreeToggle() {
			this.agreeActive = !this.agreeActive;
		},
		setStartValue(e, data) {
			if (!e.target.value) {
				e.target.value = data.startValue || ' ';
				setTimeout(() => {
					e.target.setSelectionRange(e.target.value.length, e.target.value.length);
				}, 10);
			}
		},
		maskBlur(e, data) {
			if (e.target.value.length <= data?.startValue?.length) {
				e.target.value = '';
			}
		},
	},
};
</script>

<style lang="scss">
/* stylelint-disable */
.Form {
	position: relative;

	&_screen {
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.5s ease;

		&-error,
		&-success {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			text-align: center;
		}

		&-active {
			opacity: 1;
			pointer-events: auto;
		}
	}

	&_input {
		position: relative;
		width: 100%;

		input,
		textarea {
			border: none;
			background: none;
			outline: none;
			padding: 0;
			border-radius: 0;
			font-family: inherit;
			font-weight: inherit;
			letter-spacing: inherit;
			box-sizing: border-box;
			width: 100%;
			color: inherit;

			&::placeholder {
				color: inherit;
				line-height: inherit;
			}
		}

		textarea {
			resize: none;
		}

		&_line {
			position: absolute;
			left: 0;
			width: 100%;
			bottom: 0;
			height: 0.1rem;
			background-color: #fff;
			pointer-events: none;
		}
	}

	&_agree {
		cursor: pointer;
	}

	&_send {
		opacity: 0.5;
		transition: opacity 0.2s ease;

		* {
			cursor: not-allowed !important;
		}

		&-active {
			opacity: 1;

			* {
				cursor: pointer !important;
			}
		}
	}
}
</style>
