let assert = require('chai').assert;

let Form = require('../src/Form');
let FormInstance = require('../src/FormInstance');

let Form1 = new Form([
	Form.field('field1', 'f1'),
	Form.field('field2', 'f2'),
	Form.field('field3'),
	Form.field('field4').checkbox()
]);

let Form2 = new Form([
	Form.field('field1').checkbox(),
	Form.field('field2').checkbox(),
	Form.field('field3', true).checkbox()
]);

let Form3 = new Form([
	Form.field('field1', '').notEmpty('ERR'),
	Form.field('field2', 'foo bar').maxLength(4, 'ERR'),
	Form.field('field3', 'foo').minLength(4, 'ERR'),
	Form.field('field4', 'foo@bar.pl').notEmpty('ERR').email('ERR2')
]);

describe('FormInstance.js', () => {
	it('exists', () => {
		assert.isFunction(FormInstance);
	});

	describe('constructor()', () => {
		it('accepts a Form', () => {
			let form = new Form();
			let instance = new FormInstance(form);

			assert.property(instance, 'form');
			assert.equal(instance.form, form);
		});
	});

	describe('setData()', () => {

		it('exists', () => {
			let form = Form1.createInstance();

			assert.property(form, 'setData');
			assert.isFunction(form.setData);
		});

		it('can set data from object', () => {
			let form = Form1.createInstance();

			form.setData({
				field1: 10,
				field2: 20
			});

			assert.property(form.values, 'field1');
			assert.equal(form.values.field1, 10);

			assert.property(form.values, 'field2');
			assert.equal(form.values.field2, 20);
		});

		it('can set checkboxes', () => {
			let form = Form2.createInstance();

			form.setData({
				field1: 'ON'
			});

			assert.property(form.values, 'field1');
			assert.equal(form.values.field1, true);

			assert.property(form.values, 'field2');
			assert.equal(form.values.field2, false);
		});

		it('can set checkboxes from default', () => {
			let form = Form2.createInstance();

			form.setData(null, true);

			assert.property(form.values, 'field3');
			assert.equal(form.values.field3, true);
		});

		it('can set values from defaults', () => {
			let form = Form1.createInstance();

			form.setData({});

			assert.property(form.values, 'field1');
			assert.equal(form.values.field1, 'f1');

			assert.property(form.values, 'field2');
			assert.equal(form.values.field2, 'f2');
		});

		it('accepts null instead of data', () => {
			let form = Form1.createInstance();

			form.setData(null);

			assert.property(form.values, 'field1');
			assert.equal(form.values.field1, 'f1');

			assert.property(form.values, 'field2');
			assert.equal(form.values.field2, 'f2');
		});
	});

	describe('validate()', () => {
		it('exists', () => {
			let form = Form1.createInstance();

			assert.property(form, 'reset');
			assert.isFunction(form.reset);
		});

		it('validates bad values', () => {
			let form = Form3.createInstance();

			form.setData(null, true);

			let result = form.validate();

			assert.ok(result === false);

			assert.property(form.messages, 'field1');
			assert.isArray(form.messages.field1);
			assert.equal(form.messages.field1[0], 'ERR');

			assert.property(form.messages, 'field2');
			assert.isArray(form.messages.field2);
			assert.equal(form.messages.field2[0], 'ERR');

			assert.property(form.messages, 'field3');
			assert.isArray(form.messages.field3);
			assert.equal(form.messages.field3[0], 'ERR');

			assert.notProperty(form.messages, 'field4');
		});

		it('can validate selected fields', () => {
			let form = Form3.createInstance();

			form.setData(null, true);

			let result = form.validate(['field3', 'field4']);

			assert.ok(result === false);

			assert.notProperty(form.messages, 'field1');
			assert.notProperty(form.messages, 'field2');

			assert.property(form.messages, 'field3');
			assert.isArray(form.messages.field3);
			assert.equal(form.messages.field3[0], 'ERR');

			assert.notProperty(form.messages, 'field4');
		});
	});

	describe('reset()', () => {
		it('exists', () => {
			let form = Form1.createInstance();

			assert.property(form, 'reset');
			assert.isFunction(form.reset);
		});

		it('clears all messages, valid flag and sets default values', () => {
			let form = Form3.createInstance();

			form.setData({
				field2: 'foo bar car',
			});

			let result = form.validate();

			assert.ok(result === false);
			assert.ok(form.isValid === false);

			assert.property(form.messages, 'field1');
			assert.property(form.messages, 'field2');
			assert.property(form.messages, 'field3');
			assert.notProperty(form.messages, 'field4');

			form.reset();

			assert.notProperty(form.messages, 'field1');
			assert.notProperty(form.messages, 'field2');
			assert.notProperty(form.messages, 'field3');
			assert.notProperty(form.messages, 'field4');

			assert.property(form.values, 'field1');
			assert.property(form.values, 'field2');
			assert.property(form.values, 'field3');
			assert.property(form.values, 'field4');

			assert.equal(form.values.field2, 'foo bar');

			assert.ok(form.isValid);
		});
	});

	describe('message()', () => {
		it('exists', () => {
			let form = Form1.createInstance();

			assert.property(form, 'reset');
			assert.isFunction(form.reset);
		});

		it('adds messages', () => {
			let form = Form1.createInstance();

			form.message('field1', 'Hello!');

			assert.property(form.messages, 'field1');
			assert.isArray(form.messages.field1);
			assert.equal(form.messages.field1.length, 1);
			assert.equal(form.messages.field1[0], 'Hello!');
		});

		it('adds many messages', () => {
			let form = Form1.createInstance();

			form.message('field1', 'Hello!');
			form.message('field1', 'World!');

			assert.property(form.messages, 'field1');
			assert.isArray(form.messages.field1);
			assert.equal(form.messages.field1.length, 2);
			assert.equal(form.messages.field1[0], 'Hello!');
			assert.equal(form.messages.field1[1], 'World!');
		});
	});
});
