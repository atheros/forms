let assert = require('chai').assert;

let actions = require('../src/actions');
let Field = require('../src/Field');
let FieldInstance = require('../src/FieldInstance');

function createFieldInstance(value = null) {
	let field = new Field('foo', null);
	let fieldInstance = new FieldInstance();

	fieldInstance.set(field, value);

	return fieldInstance;
}

describe('actions.js', () => {
	describe('checkNotEmpty()', () => {
		it('exists', () => {
			assert.property(actions, 'checkNotEmpty');
			assert.isFunction(actions.checkNotEmpty);
		});

		it('succeeds on null', () => {
			let field = createFieldInstance(null);
			let result = actions.checkNotEmpty(field, {});

			assert.equal(result, true);
		});

		it('fails on empty string', () => {
			let field = createFieldInstance('');
			let result = actions.checkNotEmpty(field, {});

			assert.equal(result, false);
		});

		it('succeeds on "0"', () => {
			let field = createFieldInstance('0');
			let result = actions.checkNotEmpty(field, {});

			assert.equal(result, true);
		});

		it('has default message', () => {
			let field = createFieldInstance('');

			actions.checkNotEmpty(field, {});

			assert.equal(field.messages.length, 1);
			assert.equal(field.messages[0], 'Field cannot be empty');
		});

		it('handles custom messages', () => {
			let field = createFieldInstance('');

			actions.checkNotEmpty(field, {message: 'ERR'});

			assert.equal(field.messages.length, 1);
			assert.equal(field.messages[0], 'ERR');
		});

		it('handles custom function messages', () => {
			let field = createFieldInstance('');

			actions.checkNotEmpty(field, {
				message: () => {
					return 'ERR';
				}
			});

			assert.equal(field.messages.length, 1);
			assert.equal(field.messages[0], 'ERR');
		});

		it('fails on undefined values', () => {
			let field = createFieldInstance(null);

			field.value = undefined;
			let result = actions.checkNotEmpty(field, {});

			assert.equal(result, false);
		});
	});

	describe('checkMaxLength()', () => {
		it('exists', () => {
			assert.property(actions, 'checkMaxLength');
			assert.isFunction(actions.checkMaxLength);
		});

		it('ignores nulls', () => {
			let field = createFieldInstance(null);
			let result = actions.checkMaxLength(field, {size: 1});

			assert.equal(result, true);
		});

		it('ignores numbers', () => {
			let field = createFieldInstance(10);
			let result = actions.checkMaxLength(field, {size: 1});

			assert.equal(result, true);
		});

		it('ignores booleans', () => {
			let field = createFieldInstance(true);
			let result = actions.checkMaxLength(field, {size: 1});

			assert.equal(result, true);
		});

		it('accepts strings shorter than given limit', () => {
			let field = createFieldInstance('foo');
			let result = actions.checkMaxLength(field, {size: 4});

			assert.equal(result, true);
		});

		it('accepts strings equal to given limit', () => {
			let field = createFieldInstance('foo');
			let result = actions.checkMaxLength(field, {size: 3});

			assert.equal(result, true);
		});


		it('fails when string is too long', () => {
			let field = createFieldInstance('too long');
			let result = actions.checkMaxLength(field, {size: 4});

			assert.equal(result, false);
		});

		it('succeeds on "0"', () => {
			let field = createFieldInstance('0');
			let result = actions.checkMaxLength(field, {size: 4});

			assert.equal(result, true);
		});

		it('succeeds on empty strings', () => {
			let field = createFieldInstance('');
			let result = actions.checkMaxLength(field, {size: 4});

			assert.equal(result, true);
		});

		it('has default message', () => {
			let field = createFieldInstance('foo');

			actions.checkMaxLength(field, {size: 1});

			assert.equal(field.messages.length, 1);
			assert.equal(field.messages[0], 'Field value is too long (limit 1)');
		});

		it('handles custom messages', () => {
			let field = createFieldInstance('too long');

			actions.checkMaxLength(field, {size: 4, message: 'ERR'});

			assert.equal(field.messages.length, 1);
			assert.equal(field.messages[0], 'ERR');
		});

		it('ignores undefined values', () => {
			let field = createFieldInstance(null);

			field.value = undefined;

			let result = actions.checkMaxLength(field, {size: 10});

			assert.equal(result, true);
		});
	});


	describe('checkMinLength()', () => {
		it('exists', () => {
			assert.property(actions, 'checkMinLength');
			assert.isFunction(actions.checkMinLength);
		});

		it('ignores nulls', () => {
			let field = createFieldInstance(null);
			let result = actions.checkMinLength(field, {size: 1});

			assert.equal(result, true);
		});

		it('ignores numbers', () => {
			let field = createFieldInstance(10);
			let result = actions.checkMinLength(field, {size: 1});

			assert.equal(result, true);
		});

		it('ignores booleans', () => {
			let field = createFieldInstance(true);
			let result = actions.checkMinLength(field, {size: 1});

			assert.equal(result, true);
		});

		it('rejects strings shorter than given limit', () => {
			let field = createFieldInstance('foo');
			let result = actions.checkMinLength(field, {size: 10});

			assert.equal(result, false);
		});

		it('accepts strings equal to given limit', () => {
			let field = createFieldInstance('foo');
			let result = actions.checkMinLength(field, {size: 3});

			assert.equal(result, true);
		});


		it('accepts when string is long longer than minimum', () => {
			let field = createFieldInstance('long value');
			let result = actions.checkMinLength(field, {size: 4});

			assert.equal(result, true);
		});

		it('succeeds on "0" with limit 1', () => {
			let field = createFieldInstance('0');
			let result = actions.checkMinLength(field, {size: 1});

			assert.equal(result, true);
		});

		it('fails on "0" with limit 2', () => {
			let field = createFieldInstance('0');
			let result = actions.checkMinLength(field, {size: 2});

			assert.equal(result, false);
		});

		it('fails on empty strings', () => {
			let field = createFieldInstance('');
			let result = actions.checkMinLength(field, {size: 4});

			assert.equal(result, false);
		});

		it('has default message', () => {
			let field = createFieldInstance('foo');

			actions.checkMinLength(field, {size: 10});

			assert.equal(field.messages.length, 1);
			assert.equal(field.messages[0], 'Field value is too short (limit 10)');
		});

		it('handles custom messages', () => {
			let field = createFieldInstance('short');

			actions.checkMinLength(field, {size: 10, message: 'ERR'});

			assert.equal(field.messages.length, 1);
			assert.equal(field.messages[0], 'ERR');
		});

		it('ignores undefined values', () => {
			let field = createFieldInstance(null);

			field.value = undefined;

			let result = actions.checkMinLength(field, {size: 10});

			assert.equal(result, true);
		});
	});

	describe('checkEmail()', () => {
		it('exists', () => {
			assert.property(actions, 'checkEmail');
			assert.isFunction(actions.checkEmail);
		});

		it('ignores nulls', () => {
			let field = createFieldInstance(null);
			let result = actions.checkEmail(field, {});

			assert.equal(result, true);
		});

		it('ignores empty strings', () => {
			let field = createFieldInstance('');
			let result = actions.checkEmail(field, {});

			assert.equal(result, true);
		});

		it('accepts valid email', () => {
			let field = createFieldInstance('foo@bar.com');
			let result = actions.checkEmail(field, {});

			assert.equal(result, true);
		});

		it('fails on invalid emails', () => {
			let field = createFieldInstance('foo@');
			let result = actions.checkEmail(field, {size: 4});

			assert.equal(result, false);
		});

		it('has default message', () => {
			let field = createFieldInstance('foo');

			actions.checkEmail(field, {size: 1});

			assert.equal(field.messages.length, 1);
			assert.equal(field.messages[0], 'Invalid email address');
		});

		it('handles custom messages', () => {
			let field = createFieldInstance('bar');

			actions.checkEmail(field, {message: 'ERR'});

			assert.equal(field.messages.length, 1);
			assert.equal(field.messages[0], 'ERR');
		});
	});

});
