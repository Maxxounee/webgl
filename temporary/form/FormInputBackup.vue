<template>
	<div class="FormInput">
		<TheMask
			v-if="mask && elementType === 'input'"
			v-model="value"
			:mask="maskDict[mask] ?? mask"
			masked
			:placeholder="placeholder"
			:type="inputType"
			@focus.native="setInitialValue($event, initialValue)"
			@blur.native="clearBlankValue($event, initialValue)"
		/>
		<textarea
			v-else-if="elementType === 'textarea'"
			v-model.trim="value"
			:placeholder="placeholder"
		></textarea>
		<div
			v-else-if="elementType === 'agree'"
			class="FormInput__agree agree"
			:class="{ active: agreeActive }"
			@click="agreeActive = !agreeActive"
		>
			<div class="agree__checkbox">
				<slot name="before"></slot>
			</div>
			<div class="agree__text">
				<slot></slot>
			</div>
		</div>
		<!-- TODO: передать active через scoped slot -->
		<div
			v-else-if="elementType === 'send'"
			class="FormInput__send"
			@click="sendForm"
		>
			<slot></slot>
		</div>
		<input
			v-else
			v-model.trim="value"
			:type="inputType"
			:placeholder="placeholder"
		/>
		<div
			v-if="line"
			class="FormInput__line"
		></div>
	</div>
</template>

<script>
/* eslint-disable */
import { TheMask } from 'vue-the-mask';

export default {
	components: {
		TheMask,
	},
	props: {
		name: {
			type: String,
			default: '',
		},
		/* types for choose */
		elementType: {
			type: String,
			validator(value) {
				return [
					'input',
					'textarea',
					'agree',
					'send',
				].includes(value.trim().toLowerCase());
			},
			default: 'input',
		},
		/* base html <input /> types */
		inputType: {
			type: String,
			validator(value) {
				return [
					'tel',
					'email',
					'text',
					'password',
					'url',
					'date',
				].includes(value.trim().toLowerCase());
			},
			default: 'text',
		},
		line: {
			type: Boolean,
			default: false,
		},
		activateAgree: {
			type: Boolean,
			default: false,
		},
		mask: {
			type: String,
			default: '',
		},
		placeholder: {
			type: String,
			default: '',
		},
		initialValue: {
			type: String,
			default: '',
		},
		required: {
			type: Boolean,
			default: false,
		},
		debounce: {
			type: [String, Number],
			default: 300,
		},
	},
	watch: {
		agreeActive(value) {
			if (this.elementType === 'agree') {
				try {
					this.$parent.setAgreeState(value);
				} catch (error) {
					console.error('Parent has no \"setAgreeState\" method \n\n', error);
				}
			}
		},
		value(data) {
			try {
				const options = {
					name: this.name,
					value: data,
					completelyFilled: this.checkCompletelyFilled(data),
				};
				const call = this.$parent.setFormValue.bind(this, options);
				clearTimeout(this.timeout);
				this.timeout = setTimeout(call, this.debounce);
			} catch (error) {
				console.error('Parent has no \"setFormValue\" method \n\n', error);
			}
		},
	},
	data() {
		return {
			/* Input state */
			value: '',
			agreeActive: false,

			/* Auxiliary data */
			timeout: undefined,
			maskDict: {
				phone: '+7 (###) ###-##-##',
				phone8: '8 (###) ###-##-##',
			},
			regExp: {
				emailCheck: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
			},
			noValueElementTypes: [
				'agree',
				'send',
			],
		};
	},
	mounted() {
		this.agreeActive = this.activateAgree;
		if (!this.noValueElementTypes.includes(this.elementType)) {
		}
		if (!this.noValueElementTypes.includes(this.elementType) && !this.name) {
			console.warn('There is no required attribute \"name\" \n\n', this.$el);
		}
	},
	methods: {
		checkCompletelyFilled(value) {
			let available = true;
			if (this.mask) {
				const mask = this.maskDict[this.mask] ?? this.mask;
				available = value.trim().replace(/\d/g, '#') === mask.replace(/\d/g, '#');
				this.$elog(available);
			}
			if (([this.name, this.inputType].includes('email'))) {
				available = this.regExp.emailCheck.test(value);
			}
			return available;
			// if (!item.mask && item.name !== 'email' && item.type !== 'email') {
			// 	available = true;
			// }
		},
		setParentField(name, required) {
			try {
				this.$parent.setNewField(name, required);
			} catch (error) {
				console.error('Parent has no \"setNewField\" method \n\n', error);
			}
		},
		sendForm() {
			try {
				this.$parent.send();
			} catch (error) {
				console.error('Parent has no \"send\" method \n\n', error);
			}
		},
		setInitialValue({ target }, value = '') {
			if (!target.value) {
				target.value = value;
				setTimeout(() => {
					target.setSelectionRange(target.value.length, target.value.length);
				}, 10);
			}
		},
		clearBlankValue({ target }, value = '') {
			if (target.value.length <= value.length) {
				target.value = '';
			}
		},
	},
};
</script>

<style lang="scss">
.FormInput {
	&__line {
		width: 100%;
		height: 1px;
	}

	/* reset */
	input,
	textarea {
		box-sizing: border-box;
		width: 100%;
		padding: 0;

		font-family: inherit;
		font-weight: inherit;
		color: inherit;
		letter-spacing: inherit;

		background: none;
		border: none;
		border-radius: 0;
		outline: none;

		&::placeholder {
			line-height: inherit;
			color: inherit;
		}
	}

	textarea {
		resize: none;
	}

	&__agree {
		cursor: pointer;
	}
}
</style>
