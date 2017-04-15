let validator = require('validator');

/**
 * Returns error message.
 *
 * @param {string|function} message Message source.
 * @param {string} defaultMessage Default message.
 * @returns {string} Selected message.
 */
function getMessage(message, defaultMessage) {
	let type = typeof message;

	if (type === 'function') {
		return message();
	} else if (message === null || type === 'undefined') {
		return defaultMessage;
	}

	return message;
}

/**
 * @param {FieldInstance} field Field instance object.
 * @param {object} options Additional options.
 * @returns {boolean} True if value validated, false otherwise.
 */
function checkNotEmpty(field, options) {
	let type = typeof field.value;

	if (type === 'string') {
		if (field.value === '') {
			field.message(getMessage(options.message, 'Field cannot be empty'));

			return false;
		}
	} else if (field === null || type === 'undefined') {
		field.message(getMessage(options.message, 'Field cannot be empty'));

		return false;
	}

	return true;
}

function checkMaxLength(field, options) {
	let type = typeof field.value;

	if (type === 'string' && field.value.length > options.size) {
		field.message(getMessage(options.message, 'Field value is too long (limit ' + options.size + ')'));

		return false;
	}

	return true;
}

function checkMinLength(field, options) {
	let type = typeof field.value;

	if (type === 'string' && field.value.length < options.size) {
		field.message(getMessage(options.message, 'Field value is too short (limit ' + options.size + ')'));

		return false;
	}

	return true;
}

function checkEmail(field, options) {
	if (field.value !== null && field.value !== '') {
		if (!validator.isEmail(field.value)) {
			field.message(getMessage(options.message, 'Invalid email address'));

			return false;
		}
	}

	return true;
}


function doTrim(field) {
	if (typeof field.value === 'string') {
		field.value = field.value.trim();
	}

	return true;
}

module.exports = {
	checkNotEmpty: checkNotEmpty,
	checkMaxLength: checkMaxLength,
	checkMinLength: checkMinLength,
	checkEmail: checkEmail,

	doTrim: doTrim
};
