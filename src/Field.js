let actions = require('./actions');

/**
 * Field definition class.
 */
class Field {
	constructor(name, defaultValue) {
		this.name = name;
		this.defaultValue = typeof defaultValue === 'undefined' ? null : defaultValue;
		this.doTrim = true;
		this.actions = [];

		this.isCheckbox = false;
	}

	/**
	 * Mark this field as checkbox.
	 *
	 * This does special handling of HTML input type checkbox.
	 *
	 * @returns {Field} Chained Field object.
	 */
	checkbox() {
		this.isCheckbox = true;

		return this;
	}

	/**
	 * Mark this field so it's value won't get trimmed.
	 *
	 * @returns {Field} Chained Field object.
	 */
	noTrim() {
		this.doTrim = false;

		return this;
	}

	/**
	 * Check if the field is not empty.
	 *
	 * @param {string|function} message Message on error.
	 * @returns {Field} Chained Field object.
	 */
	notEmpty(message) {
		this.actions.push({
			fn: actions.checkNotEmpty,
			message: message
		});

		return this;
	}

	maxLength(size, message) {
		this.actions.push({
			fn: actions.checkMaxLength,
			size: size,
			message: message
		});

		return this;
	}

	minLength(size, message) {
		this.actions.push({
			fn: actions.checkMinLength,
			size: size,
			message: message
		});

		return this;
	}


	email(message) {
		this.actions.push({
			fn: actions.checkEmail,
			message: message
		});

		return this;
	}
}

module.exports = Field;
