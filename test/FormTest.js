let assert = require('chai').assert;

let Form = require('../src/Form');
let FormInstance = require('../src/FormInstance');
let Field = require('../src/Field');

describe('Form.js', () => {
	it('exists', () => {
		assert.isFunction(Form);
	});

	describe('field', () => {
		it('exists', () => {
			assert.property(Form, 'field');
			assert.isFunction(Form.field);
		});

		it('returns Field', () => {
			let field = Form.field('foo', 'bar');

			assert.isObject(field);
			assert.ok(field instanceof Field);
			assert.equal(field.name, 'foo');
			assert.equal(field.defaultValue, 'bar');
		});
	});

	describe('constructor()', () => {
		it('fails when not given an array', () => {
			try {
				new Form(true);
			} catch (e) {
				return;
			}

			throw new Error('Expected exception');
		});

		it('ignores null when given as fields', () => {
			let form = new Form(null);

			assert.property(form, 'fields');
			assert.isArray(form.fields);
			assert.equal(form.fields.length, 0);
		});

		it('succeeds when given an empty array', () => {
			new Form([]);
		});

		it('accepts fields array', () => {
			let form = new Form([Form.field('foo'), Form.field('bar')]);

			assert.equal(form.fields.length, 2);
		});

		it('throws when not given valid fields', () => {
			try {
				new Form([true, false]);
			} catch (e) {
				return;
			}

			throw new Error('Expected exception');
		});
	});

	describe('getFieldNames()', () => {
		let someForm = new Form();

		it('exists', () => {
			assert.property(someForm, 'getFieldNames');
			assert.isFunction(someForm.getFieldNames);
		});

		it('returns an array of field names()', () => {
			let form = new Form([Form.field('foo'), Form.field('bar')]);
			let names = form.getFieldNames();

			assert.isArray(names);
			assert.equal(names.length, 2);
			assert.deepEqual(names, ['foo', 'bar']);
		});
	});

	describe('getField()', () => {
		let someForm = new Form();

		it('exists', () => {
			assert.property(someForm, 'getField');
			assert.isFunction(someForm.getField);
		});

		it('returns null when field is not found', () => {
			let form = new Form();
			let field = form.getField('foo');

			assert.isNull(field);
		});

		it('returns field', () => {
			let foo = Form.field('foo');
			let bar = Form.field('bar');
			let form = new Form([foo, bar]);

			let field1 = form.getField('foo');
			let field2 = form.getField('bar');

			assert.isObject(field1);
			assert.equal(foo, field1);

			assert.isObject(field2);
			assert.equal(bar, field2);
		});
	});

	describe('createInstance()', () => {
		let someForm = new Form([
			Form.field('foo')
		]);

		it('exists', () => {
			assert.property(someForm, 'createInstance');
			assert.isFunction(someForm.createInstance);
		});

		it('returns new form instance', () => {
			let form = new Form();
			let instance = form.createInstance();

			assert.isObject(instance);
			assert.ok(instance instanceof FormInstance);
		});

		it('can set data', () => {
			let instance = someForm.createInstance({foo: 'bar'});

			assert.isObject(instance);
			assert.ok(instance instanceof FormInstance);
			assert.property(instance.values, 'foo');
			assert.equal(instance.values.foo, 'bar');
		});
	});
});
