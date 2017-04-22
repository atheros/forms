let FieldInstance = require('./FieldInstance');

class FormInstance {

	constructor(form) {
		this.form = form;
		this.messages = {};
		this.values = {};
		this.isValid = true;
	}

	setData(data) {
		if (!data) {
			data = {};
		}

		for (let field of this.form.fields) {
			let value = data[field.name];
			let type = typeof value;

			// Use default value if needed.
			if (type === 'undefined') {
				value = field.defaultValue;
				type = typeof value;
			}

			if (value !== null) {
				if (field.isCheckbox) {
					this.values[field.name] = !!value;
				} else if (type === 'string' && field.doTrim) {
					this.values[field.name] = value.trim();
				} else {
					this.values[field.name] = value;
				}
			} else if (field.isCheckbox) {
				// When chekbox is not set, the field won't be available in http body.
				this.values[field.name] = false;
			} else {
				// No value given and no default value, set to null.
				this.values[field.name] = null;
			}
		}
	}

	/**
	 * Validate form data.
	 *
	 * formInstance.isValid will contain validation result.
	 * formInstance.messages will contain an array for each field containing errors.
	 *
	 * @param {string[]} [filter] Optional array of fields to validate.
	 * @returns {boolean} True if form is valid, false otherwise.
	 */
	validate(filter) {
		let fieldInstance = new FieldInstance();

		for (let field of this.form.fields) {
			// Check if field is filtered.
			if (filter) {
				if (filter.indexOf(field.name) === -1) {
					continue;
				}
			}


			fieldInstance.set(field, this.values[field.name]);

			for (let action of field.actions) {
				if (!action.fn(fieldInstance, action)) {
					// Error happened, don't perform other actions on this field.
					this.isValid = false;
					break;
				}
			}

			// Update form value.
			this.values[field.name] = fieldInstance.value;

			// Copy messages.
			if (fieldInstance.messages.length) {
				this.messages[field.name] = fieldInstance.messages;
			}
		}

		return this.isValid;
	}

	/**
	 * Reset form instance state.
	 *
	 * Removes messages, reset valid flag and sets default values.
	 *
	 * @returns {undefined}
	 */
	reset() {
		this.values = {};
		this.messages = {};
		this.isValid = true;

		// Set default values.
		this.setData(null);
	}

	/**
	 * Add a new message for given field.
	 *
	 * @param {string} fieldName Field name.
	 * @param {string} message Message to add.
	 * @returns {undefined}
	 */
	message(fieldName, message) {
		if (!this.messages[fieldName]) {
			this.messages[fieldName] = [];
		}

		this.messages[fieldName].push(message);
		this.isValid = false;
	}
}

module.exports = FormInstance;
