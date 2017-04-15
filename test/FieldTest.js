let assert = require('chai').assert;

let actions = require('../src/actions');
let Form = require('../src/Form');
let Field = require('../src/Field');

describe('Field.js', () => {
	it('exists', () => {
		assert.isFunction(Field);
	});

	describe('constructor()', () => {
		it('accepts name and default value', () => {
			let field = new Field('foo', 'bar');

			assert.property(field, 'name');
			assert.equal(field.name, 'foo');

			assert.property(field, 'defaultValue');
			assert.equal(field.defaultValue, 'bar');
		});
	});

	describe('checkbox()', () => {
		let someField = new Field('foo', 'bar');

		it('exists', () => {
			assert.property(someField, 'checkbox');
			assert.isFunction(someField.checkbox);
		});

		it('marks field as checkbox', () => {
			let field = Form.field('foo').checkbox();

			assert.isObject(field);
			assert.ok(field instanceof Field);
			assert.property(field, 'isCheckbox');
			assert.ok(field.isCheckbox);
		});
	});

	describe('notEmpty()', () => {
		it('exists', () => {
			let field = new Field('foo');

			assert.property(field, 'notEmpty');
			assert.isFunction(field.notEmpty);
		});

		it('chains Field object', () => {
			let field = new Field('foo');
			let field2 = field.notEmpty();

			assert.equal(field, field2);
		});

		it('adds checkNotEmpty action', () => {
			let field = new Field('foo');

			field.notEmpty('ERR');

			assert.equal(field.actions.length, 1);
			assert.equal(field.actions[0].fn, actions.checkNotEmpty);
			assert.equal(field.actions[0].message, 'ERR');
		});
	});

	describe('maxLength()', () => {
		it('exists', () => {
			let field = new Field('foo');

			assert.property(field, 'maxLength');
			assert.isFunction(field.maxLength);
		});

		it('chains Field object', () => {
			let field = new Field('foo');
			let field2 = field.maxLength(1);

			assert.equal(field, field2);
		});

		it('adds checkMaxLength action', () => {
			let field = new Field('foo');

			field.maxLength(10, 'ERR');

			assert.equal(field.actions.length, 1);
			assert.equal(field.actions[0].fn, actions.checkMaxLength);
			assert.equal(field.actions[0].message, 'ERR');
			assert.equal(field.actions[0].size, 10);
		});
	});

	describe('minLength()', () => {
		it('exists', () => {
			let field = new Field('foo');

			assert.property(field, 'minLength');
			assert.isFunction(field.minLength);
		});

		it('chains Field object', () => {
			let field = new Field('foo');
			let field2 = field.minLength(1);

			assert.equal(field, field2);
		});

		it('adds checkMinLength action', () => {
			let field = new Field('foo');

			field.minLength(10, 'ERR');

			assert.equal(field.actions.length, 1);
			assert.equal(field.actions[0].fn, actions.checkMinLength);
			assert.equal(field.actions[0].message, 'ERR');
			assert.equal(field.actions[0].size, 10);
		});
	});

	describe('email()', () => {
		it('exists', () => {
			let field = new Field('foo');

			assert.property(field, 'email');
			assert.isFunction(field.email);
		});

		it('chains Field object', () => {
			let field = new Field('foo');
			let field2 = field.email();

			assert.equal(field, field2);
		});

		it('adds checkMinLength action', () => {
			let field = new Field('foo');

			field.email('ERR');

			assert.equal(field.actions.length, 1);
			assert.equal(field.actions[0].fn, actions.checkEmail);
			assert.equal(field.actions[0].message, 'ERR');
		});
	});
});
